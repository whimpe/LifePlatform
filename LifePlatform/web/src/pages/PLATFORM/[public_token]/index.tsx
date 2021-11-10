import { Flex } from '@chakra-ui/core';
import { CircularProgress } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { getAccessToken, setAccessToken } from '../../../accessToken';
import ErrorPage from '../../../components/general/ErrorPage';
import { Layout } from '../../../components/general/Layout';
import MetaTags from '../../../components/general/MetaTags';
import { Accepted_blok } from '../../../components/index_components/Accepted_blok';
import { Altijdzichtbaar } from '../../../components/index_components/Altijdzichtbaar';
import { In_afwachting } from '../../../components/index_components/In_afwachting';
import { Login_blok } from '../../../components/index_components/login_blok';
import { Vraagtoegang } from '../../../components/index_components/vraagtoegang';
import LoginModal from '../../../components/modal_components/LoginModal';
import NoAuthorsAllowedModal from '../../../components/modal_components/NoAuthorsAllowedModal';
import { useIndexPageQuery, useMeQuery } from '../../../generated/graphql';
import { STATUS } from '../../../types';
import { isServer } from '../../../utils/isServer';
import { useGetStringFromUrl } from '../../../utils/useGetIntFromUrl';
import { WithApollo } from '../../../utils/withApollo';


const Index = () => {

  
  const router = useRouter();

  const public_or_private_token = useGetStringFromUrl('public_token');

  const { data: IndexData, loading: IndexLoading, error: IndexError, refetch, } = useIndexPageQuery({ variables: { public_or_private_token: public_or_private_token }, skip: isServer(), notifyOnNetworkStatusChange: true, fetchPolicy: 'network-only', });

  const { data: meData, loading: MeLoading, error: Meerror, } = useMeQuery({ variables: { paginaId: public_or_private_token }, skip: isServer(), });

  const [LoginModalClick, setLoginModalClick] = useState(false);
  const [hasAccount, sethasAccount] = useState(false);
  const [Max_Authors, setMax_Authors] = useState(false);


  // Error van de queies

  if (IndexLoading || MeLoading) {
    return (
      <div>
        {' '}
        <Flex align='center' justify='center'>
          {' '}
          <CircularProgress color='primary' size={30} />{' '}
        </Flex>{' '}
      </div>
    );
  }

  if (IndexError) {
    console.log('index error :', IndexError);

    if (
      IndexError.message.includes(
        'Je hebt al het maximum aantal mensen op je pagina, schakel over naar basic'
      )
    ) {
      //TODO indexError is via directe link dus moet je aangepaste dialoog maken -> geen state enzo gebruiken hier
      {
        console.log('index error :', IndexError);
      }

      return (
        <NoAuthorsAllowedModal
          active={true}
          setactive={setMax_Authors}
          error_type={'max_authors'}
          link={`/PLATFORM/${public_or_private_token}/settings`}
        />
      );
    }
  }

  if (!IndexData?.indexPage) {
    console.log(IndexData?.indexPage);
    return (
      <>
        <ErrorPage />{' '}
      </>
    );
  }
  const OpenLoginModal = (hasAccount: boolean) => {
    sethasAccount(hasAccount);
    setLoginModalClick(true);
  };
  const ClickRoute = (e: any, route_link: string) => {
    if (meData?.me?.user?.id !== undefined) {
      router.push(
        `/PLATFORM/${IndexData?.indexPage!.herdenkingspagina!.id}/${route_link}`
      );
    } else {
      OpenLoginModal(true);
    }
  };

  let body = null;

  if (getAccessToken() === '') {
    body = (
      <Login_blok
        public_token={IndexData.indexPage.herdenkingspagina?.id!}
        OpenLoginModal={OpenLoginModal}
      />
    );
  } else if (IndexData?.indexPage.accessLevel < STATUS.Pending) {
    body = (
      <Vraagtoegang
        public_token={IndexData.indexPage.herdenkingspagina?.id!}
        shareable={true} //IndexData!.indexPage.herdenkingspagina!.shareable
        username_requestor={meData!.me!.user!.username}
        name_of_page={IndexData.indexPage.herdenkingspagina?.name_of_page}
      />
    );
  } else if (IndexData?.indexPage.accessLevel === STATUS.Pending) {
    body = (
      <In_afwachting
        public_token={IndexData?.indexPage.herdenkingspagina?.id!}
        condolance_active={ IndexData?.indexPage.herdenkingspagina?.condoleance_active! }
        name_of_page={IndexData!.indexPage.herdenkingspagina!.name_of_page}
        has_passed_away={!IndexData!.indexPage.herdenkingspagina!.DoD}
      />
    );
  } else if (IndexData?.indexPage.accessLevel > STATUS.Pending) {
    body = (
      <Accepted_blok
        public_token={IndexData!.indexPage!.herdenkingspagina!.id}
        condolance_active={ IndexData!.indexPage.herdenkingspagina!.condoleance_active }
        meData={meData}
      />
    );

    if (IndexData?.indexPage?.privaat_of_publiek === 'privaat') {
      if (IndexData?.indexPage?.accessToken!) {
        setAccessToken(IndexData.indexPage.accessToken);
      }
      router.push(
        `/PLATFORM/[public_token]/`,
        `/PLATFORM/${IndexData?.indexPage!.herdenkingspagina!.id}/`
      );
    }
  } else {
  }

  // geen gebruiker ingelogt dus navbar_LP

  return (
    <>
      <MetaTags
        title={IndexData!.indexPage?.herdenkingspagina?.name_of_page}
        type_of_page={''}
        description={IndexData?.indexPage?.herdenkingspagina?.text}
        mediaUrl={IndexData?.indexPage?.herdenkingspagina?.mediaUrl}
      />

      <div className='background_platform'>

        <Layout page_name={''} />

        <Altijdzichtbaar
          herdenkingspagina={IndexData?.indexPage.herdenkingspagina!}
          meData={meData}
        />

        {body}

        <div className="dashboard_footer" onClick={() => { router.push("/#home"); }} >
          <img src="/img/logos/logo_black.svg" alt="Aeterna" className="dashboard_footer_img" />

        </div>

        {LoginModalClick ? (
          <>
            <LoginModal
              title={''}
              LoginModalClick={LoginModalClick}
              setLoginModalClick={setLoginModalClick}
              hasAccount={hasAccount}
              sethasAccount={sethasAccount}
            />
          </>
        ) : null}




      </div>
    </>
  );
};





export default WithApollo({ ssr: true })(Index);
