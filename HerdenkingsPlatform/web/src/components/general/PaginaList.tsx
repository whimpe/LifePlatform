import { CircularProgress, Tooltip } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { GoSettings } from 'react-icons/go';
import { ImArrowRight2 } from 'react-icons/im';
import { RiUserSharedLine } from 'react-icons/ri';
import {
  AccessRequestsByUserIdQuery,
  useMeQuery
} from '../../generated/graphql';
import { get_year } from '../../utils/FormatDate';
import ShareModal from '../modal_components/ShareModal';
import { MediaDisplay } from './MediaDisplay';

const Title = [
  "Pagina's in beheer ", // 5
  "Pagina's met goedkeuring ", // 2-4
  "Pagina's afwachting toestemming ", //<2
];

interface PaginaListProps {
  loading: boolean;
  requests: AccessRequestsByUserIdQuery | undefined;
  StartNewPage: any;
}

export const PaginaList: React.FC<PaginaListProps> = ({
  loading,
  requests,
  StartNewPage,
}) => {
  const router = useRouter();

  //TODO: check of meData niet op betere plaats kan
  const { data: meData, loading: meloading } = useMeQuery();
  const [ShareModalClick, setShareModalClick] = useState(false);

  const [SelectedPage, setSelectedPage] = useState<any>(null);

  return (
    <>
      {!requests && (loading || meloading) ? (
        // <Flex align='center' justify='center'>
          <CircularProgress color='primary' size={30} />
        // </Flex>
      ) : (
        <div className='dashboard_grid_container'>
          {requests!.accessRequestsByUserId.map((arequest) =>
            arequest.status >= 0 ? (
              <>
                <div className='dashboard_card' key={arequest.id}>
                  <div className='dashboard_img_box'>
                    <MediaDisplay awsUrl={arequest.pagina.mediaUrl} width='100%' type='image' designclass={ arequest.status === 1 ? 'dashboard_img_wait' : 'dashboard_img' } />
                    {arequest.status === 1 ? (
                      <div className='dashboard_img_badge'>
                        Afwachten toelating
                      </div>
                    ) : null}
                  </div>

                  <div className='dashboard_text_box'>
                    <div className='dashboard_dates_box'>
                      <div className='dashboard_dates'>
                        {get_year(arequest.pagina.DoB)}
                        {arequest.pagina.DoD ? (
                          <> - {get_year(arequest.pagina.DoD)}</>
                        ) : null}
                      </div>
                      <Tooltip title='Levensverhaal delen' placement='top'>
                        <div className='dashboard_edit_btn' onClick={() => { setSelectedPage(arequest); setShareModalClick(true); }} >
                          
                          <RiUserSharedLine className='dashboard_edit_btn_icon' />
                        </div>
                      </Tooltip>
                      {arequest.status >= 4 ? (
                        <Tooltip title='Paginabeheer' placement='top'>
                          <div
                            className='dashboard_edit_btn'
                            onClick={() => {
                              router.push(
                                `/PLATFORM/${arequest.paginaId}/settings`
                              );
                            }}
                          >
                            
                            <GoSettings className='dashboard_edit_btn_icon' />
                          </div>
                        </Tooltip>
                      ) : null}
                    </div>
                    <div className='dashboard_card_title'>
                      {arequest.pagina.name_of_page}
                    </div>
                    <div className='dashboard_card_subtext'> {arequest.pagina.text.replace( /[\/\\#,+()$~%'":*<>{}]/g, '' )} ... </div>
                  </div>

                  <div className='dashboard_card_btn' onClick={() => { router.push(`/PLATFORM/${arequest.paginaId}`); }} >
                    <div className='dashboard_card_btn_text'>
                      
                      Bekijk het verhaal <ImArrowRight2 />
                    </div>
                  </div>
                </div>
                {/* sharing modal for each memorypage */}
              
              </>
            ) : null
          )}

          {/* lege template start  */}
          <div id={'dashboard_card_default'} className='dashboard_card_default'>
            <img
              src={'img/logos/logo_black.svg'}
              alt='Aeterna'
              className='logo_dashboard_box'
            />
            <div className='dashboard_text_box'>
              <div className='dashboard_card_title'>
                Maak een eerste levenstijdlijn gratis aan!
              </div>

              <div className='dashboard_card_subtext'>
                Een levenstijdlijn dient als de ideale plaats om online
                herinneringen uit te wisselen met elkaar over een dierbare
                vriend(in) of familielid.
              </div>
            </div>

            <div
              className='dashboard_card_btn_default'
              onClick={(e: any) => {
                StartNewPage(e);
              }}
            >
              <div className='dashboard_card_btn_text'>
                
                Start gratis een Levenstijdlijn <ImArrowRight2 />
              </div>
            </div>
          </div>



          {/* share modal */}
          
          {ShareModalClick ? 
              <ShareModal
                      ShareModalClick={ShareModalClick}
                      setShareModalClick={setShareModalClick}
                      name_of_page={SelectedPage?.pagina?.name_of_page}
                      public_link={`https://aeterna.be/PLATFORM/${SelectedPage?.paginaId}`}
                      private_link={`https://aeterna.be/PLATFORM/${SelectedPage?.pagina?.private_token}`}
                    />
            :null}

        </div>
      )}
    </>
  );
};
