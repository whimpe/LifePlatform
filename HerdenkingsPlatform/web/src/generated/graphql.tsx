import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  Upload: any;
};

export type AccessRequest = {
  __typename?: 'AccessRequest';
  createdAt: Scalars['String'];
  id: Scalars['String'];
  pagina: HerdenkingsPagina;
  paginaId: Scalars['String'];
  requestor: User;
  requestorId: Scalars['String'];
  requesttext: Scalars['String'];
  status: Scalars['Float'];
  updatedAt: Scalars['String'];
};

export type CheckpaymentResponse = {
  __typename?: 'CheckpaymentResponse';
  aantal_dagen: Scalars['String'];
  status: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  comment: Scalars['String'];
  createdAt: Scalars['String'];
  creator: User;
  creatorId: Scalars['String'];
  id: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type CommentHerinnering = {
  __typename?: 'CommentHerinnering';
  comment: Scalars['String'];
  createdAt: Scalars['String'];
  creator: User;
  creatorId: Scalars['String'];
  herinnering: Herinnering;
  herinneringId: Scalars['String'];
  id: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type CommentMedia = {
  __typename?: 'CommentMedia';
  comment: Scalars['String'];
  createdAt: Scalars['String'];
  creator: User;
  creatorId: Scalars['String'];
  id: Scalars['String'];
  media: Media;
  mediaId: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type CommentMessage = {
  __typename?: 'CommentMessage';
  comment: Scalars['String'];
  createdAt: Scalars['String'];
  creator: User;
  creatorId: Scalars['String'];
  id: Scalars['String'];
  message: Message;
  messageId: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Condolatie = {
  __typename?: 'Condolatie';
  createdAt: Scalars['String'];
  creator: User;
  creatorId: Scalars['String'];
  id: Scalars['String'];
  media: Array<MediaCondolatie>;
  pagina: HerdenkingsPagina;
  paginaId: Scalars['String'];
  text: Scalars['String'];
  textSnippet: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type CondolatieInput = {
  text: Scalars['String'];
};


export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type HerdenkingsPagina = {
  __typename?: 'HerdenkingsPagina';
  DesignType: Scalars['Float'];
  DoB: Scalars['String'];
  DoD?: Maybe<Scalars['String']>;
  Payment_plan: Scalars['Float'];
  Payment_status: Scalars['Float'];
  ValidUntil: Scalars['String'];
  accessible: Scalars['Boolean'];
  accessrequests: Array<AccessRequest>;
  condolaties: Array<Condolatie>;
  condoleance_active: Scalars['Boolean'];
  control_before: Scalars['Boolean'];
  createdAt: Scalars['String'];
  herinneringen: Array<Herinnering>;
  id: Scalars['String'];
  mediaUrl: Scalars['String'];
  name_of_page: Scalars['String'];
  number_of_bytes: Scalars['Float'];
  number_of_condolances: Scalars['Float'];
  number_of_media: Scalars['Float'];
  number_of_memories: Scalars['Float'];
  number_of_messages: Scalars['Float'];
  number_of_people: Scalars['Float'];
  number_of_personal_messages: Scalars['Float'];
  owner: User;
  ownerId: Scalars['String'];
  persoonlijkeBerichten: Array<PersonalMessage>;
  private_token: Scalars['String'];
  shareable: Scalars['Boolean'];
  text: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type HerdenkingsPaginaInput = {
  DesignType: Scalars['Float'];
  DoB: Scalars['DateTime'];
  condoleance_active: Scalars['Boolean'];
  control_before: Scalars['Boolean'];
  mediaUrl: Scalars['String'];
  name_of_page: Scalars['String'];
  text: Scalars['String'];
};

export type HerdenkingsPaginaResponse = {
  __typename?: 'HerdenkingsPaginaResponse';
  accessToken?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<FieldError>>;
  herdenkingspagina?: Maybe<HerdenkingsPagina>;
};

export type Herinnering = {
  __typename?: 'Herinnering';
  categorie?: Maybe<Scalars['Float']>;
  comments: Array<CommentHerinnering>;
  createdAt: Scalars['String'];
  creator: User;
  creatorId: Scalars['String'];
  datumVanHerinnering?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  media: Array<MediaHerinnering>;
  on_timeline: Scalars['Boolean'];
  pagina: HerdenkingsPagina;
  paginaId: Scalars['String'];
  status?: Maybe<Scalars['Float']>;
  text?: Maybe<Scalars['String']>;
  textSnippet: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
};

export type HerinneringInput = {
  categorie?: Maybe<Scalars['Float']>;
  datumVanHerinnering?: Maybe<Scalars['DateTime']>;
  on_timeline: Scalars['Boolean'];
  text?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type IndexPageResponse = {
  __typename?: 'IndexPageResponse';
  accessLevel: Scalars['Int'];
  accessToken?: Maybe<Scalars['String']>;
  herdenkingspagina?: Maybe<HerdenkingsPagina>;
  privaat_of_publiek?: Maybe<Scalars['String']>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type MeResponse = {
  __typename?: 'MeResponse';
  partner_type?: Maybe<Scalars['Float']>;
  status: Scalars['Float'];
  user?: Maybe<User>;
};

export type Media = {
  __typename?: 'Media';
  comments: Array<CommentMedia>;
  createdAt: Scalars['String'];
  creator: User;
  creatorId: Scalars['String'];
  datumVanMedia?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  mediaType: Scalars['String'];
  objectSize?: Maybe<Scalars['Float']>;
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
  urlFile: Scalars['String'];
};

export type MediaCondolatie = {
  __typename?: 'MediaCondolatie';
  comments: Array<CommentMedia>;
  condolatie: Condolatie;
  condolatieId: Scalars['String'];
  createdAt: Scalars['String'];
  creator: User;
  creatorId: Scalars['String'];
  datumVanMedia?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  mediaType: Scalars['String'];
  objectSize?: Maybe<Scalars['Float']>;
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
  urlFile: Scalars['String'];
};

export type MediaHerinnering = {
  __typename?: 'MediaHerinnering';
  comments: Array<CommentMedia>;
  createdAt: Scalars['String'];
  creator: User;
  creatorId: Scalars['String'];
  datumVanMedia?: Maybe<Scalars['DateTime']>;
  herinnering: Herinnering;
  herinneringId: Scalars['String'];
  id: Scalars['String'];
  mediaType: Scalars['String'];
  objectSize?: Maybe<Scalars['Float']>;
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
  urlFile: Scalars['String'];
};

export type MediaInput = {
  datumVanMedia?: Maybe<Scalars['DateTime']>;
  mediaType: Scalars['String'];
  objectSize: Scalars['Float'];
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  urlFile: Scalars['String'];
};

export type MediaMessage = {
  __typename?: 'MediaMessage';
  comments: Array<CommentMedia>;
  createdAt: Scalars['String'];
  creator: User;
  creatorId: Scalars['String'];
  datumVanMedia?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  mediaType: Scalars['String'];
  message: Message;
  messageId: Scalars['String'];
  objectSize?: Maybe<Scalars['Float']>;
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
  urlFile: Scalars['String'];
};

export type MediaPersonalMessage = {
  __typename?: 'MediaPersonalMessage';
  comments: Array<CommentMedia>;
  createdAt: Scalars['String'];
  creator: User;
  creatorId: Scalars['String'];
  datumVanMedia?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  mediaType: Scalars['String'];
  objectSize?: Maybe<Scalars['Float']>;
  personalMessage: PersonalMessage;
  persoonlijkeboodschap: PersonalMessage;
  persoonlijkeboodschapId: Scalars['String'];
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
  urlFile: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  comments: Array<CommentMessage>;
  createdAt: Scalars['String'];
  creator: User;
  creatorId: Scalars['String'];
  id: Scalars['String'];
  media: Array<MediaMessage>;
  pagina: HerdenkingsPagina;
  paginaId: Scalars['String'];
  status?: Maybe<Scalars['Float']>;
  text?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
};

export type MessageInput = {
  status?: Maybe<Scalars['Float']>;
  text: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  Invite_people: Scalars['Boolean'];
  UpdatePassword: Scalars['Boolean'];
  addMediaUrl?: Maybe<HerdenkingsPagina>;
  cancelMollieSubscription: Scalars['String'];
  changeMemoryOnTimelineState?: Maybe<Herinnering>;
  changeMemoryStatus?: Maybe<Herinnering>;
  changeMessageStatus?: Maybe<Message>;
  changePassword: Scalars['Boolean'];
  changeStatusAccessRequest: AccessRequest;
  createAccessRequest: AccessRequest;
  createCommentHerinnering: CommentHerinnering;
  createCondolatie: Condolatie;
  createHerdenkingspagina: HerdenkingsPaginaResponse;
  createHerinnering: Herinnering;
  createLevenstijdlijnBetaling: PaymentResponse;
  createLevenstijdlijnDomiciliering: PaymentResponse;
  createMediaCondolatie: MediaCondolatie;
  createMediaHerinnering: MediaHerinnering;
  createMediaMessage: MediaMessage;
  createMediaPersonalMessage: MediaPersonalMessage;
  createMessage: Message;
  createPartnerHerdenkingspagina: HerdenkingsPaginaResponse;
  createPersonalMessage: PersonalMessage;
  createPersonalMessageAccess: PersonalMessageResponse;
  deleteComment: Scalars['Boolean'];
  deleteCondolatie: Scalars['Boolean'];
  deleteHerinnering: Scalars['Boolean'];
  deleteMedia?: Maybe<Scalars['Boolean']>;
  deleteMessage: Scalars['Boolean'];
  deleteObsoletePage: Scalars['Boolean'];
  deleteObsoleteUser: Scalars['Boolean'];
  deletePersonalMessage: Scalars['Boolean'];
  deletePersonalMessageAccess: Scalars['Boolean'];
  digitize_confirmation: Scalars['Boolean'];
  digitize_request: Scalars['Boolean'];
  email_collecter: Scalars['Boolean'];
  facebookLogin: LoginResponse;
  feedback: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  googleLogin: LoginResponse;
  login: LoginResponse;
  logout: Scalars['Boolean'];
  mediaForVideoSlideshow: Array<MediaHerinnering>;
  multipleUpload: Array<UploadedFileResponse>;
  register: LoginResponse;
  register_partner: LoginResponse;
  requestToVerifyAccount: Scalars['Boolean'];
  revokeRefreshTokensForUser: Scalars['Boolean'];
  singleUpload: UploadedFileResponse;
  subscribe: Scalars['Boolean'];
  updateComment?: Maybe<Scalars['Boolean']>;
  updateCondolatie?: Maybe<Condolatie>;
  updateHerdenkingsPagina?: Maybe<HerdenkingsPagina>;
  updateHerinnering?: Maybe<Herinnering>;
  updateMedia?: Maybe<Media>;
  updatePersonalMessage?: Maybe<PersonalMessage>;
  updateUser?: Maybe<Scalars['Boolean']>;
  validateOwnership: Scalars['Boolean'];
  verifyAccount: Scalars['Boolean'];
  verifyPartner: Scalars['Boolean'];
};


export type MutationInvite_PeopleArgs = {
  email: Scalars['String'];
  public_token: Scalars['String'];
  username: Scalars['String'];
};


export type MutationUpdatePasswordArgs = {
  newPassword: Scalars['String'];
  oldpassword: Scalars['String'];
};


export type MutationAddMediaUrlArgs = {
  mediaUrl: Scalars['String'];
  paginaId: Scalars['String'];
};


export type MutationCancelMollieSubscriptionArgs = {
  MollieSubscriptionId: Scalars['String'];
  public_token: Scalars['String'];
};


export type MutationChangeMemoryOnTimelineStateArgs = {
  id: Scalars['String'];
  paginaId: Scalars['String'];
  status: Scalars['Boolean'];
};


export type MutationChangeMemoryStatusArgs = {
  id: Scalars['String'];
  paginaId: Scalars['String'];
  status: Scalars['Float'];
};


export type MutationChangeMessageStatusArgs = {
  id: Scalars['String'];
  paginaId: Scalars['String'];
  status: Scalars['Float'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationChangeStatusAccessRequestArgs = {
  id: Scalars['String'];
  paginaId: Scalars['String'];
  status: Scalars['Float'];
};


export type MutationCreateAccessRequestArgs = {
  paginaId: Scalars['String'];
  requestor_username: Scalars['String'];
  requesttext: Scalars['String'];
};


export type MutationCreateCommentHerinneringArgs = {
  comment: Scalars['String'];
  herinneringId: Scalars['String'];
  paginaId: Scalars['String'];
};


export type MutationCreateCondolatieArgs = {
  input: CondolatieInput;
  paginaId: Scalars['String'];
};


export type MutationCreateHerdenkingspaginaArgs = {
  DoD?: Maybe<Scalars['DateTime']>;
  input: HerdenkingsPaginaInput;
};


export type MutationCreateHerinneringArgs = {
  input: HerinneringInput;
  paginaId: Scalars['String'];
  status?: Maybe<Scalars['Float']>;
};


export type MutationCreateLevenstijdlijnBetalingArgs = {
  payment_plan: Scalars['Float'];
  payment_term: Scalars['Float'];
  public_token: Scalars['String'];
};


export type MutationCreateLevenstijdlijnDomicilieringArgs = {
  payment_plan: Scalars['Float'];
  payment_term: Scalars['Float'];
  public_token: Scalars['String'];
};


export type MutationCreateMediaCondolatieArgs = {
  condolatieId: Scalars['String'];
  input: MediaInput;
  paginaId: Scalars['String'];
};


export type MutationCreateMediaHerinneringArgs = {
  herinneringId: Scalars['String'];
  input: MediaInput;
  paginaId: Scalars['String'];
};


export type MutationCreateMediaMessageArgs = {
  input: MediaInput;
  messageId: Scalars['String'];
  paginaId: Scalars['String'];
};


export type MutationCreateMediaPersonalMessageArgs = {
  input: MediaInput;
  paginaId: Scalars['String'];
  pmessageId: Scalars['String'];
};


export type MutationCreateMessageArgs = {
  input: MessageInput;
  paginaId: Scalars['String'];
};


export type MutationCreatePartnerHerdenkingspaginaArgs = {
  DoD?: Maybe<Scalars['DateTime']>;
  info_administrator?: Maybe<UsernamePasswordInput>;
  input: HerdenkingsPaginaInput;
  partner_email: Scalars['String'];
  partner_name: Scalars['String'];
  partner_type: Scalars['Float'];
};


export type MutationCreatePersonalMessageArgs = {
  input: PersonalMessageInput;
  paginaId: Scalars['String'];
};


export type MutationCreatePersonalMessageAccessArgs = {
  paginaId: Scalars['String'];
  personalMessageId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['String'];
  paginaId: Scalars['String'];
};


export type MutationDeleteCondolatieArgs = {
  id: Scalars['String'];
  paginaId: Scalars['String'];
};


export type MutationDeleteHerinneringArgs = {
  id: Scalars['String'];
  paginaId: Scalars['String'];
};


export type MutationDeleteMediaArgs = {
  id: Scalars['String'];
  paginaId: Scalars['String'];
};


export type MutationDeleteMessageArgs = {
  id: Scalars['String'];
  paginaId: Scalars['String'];
};


export type MutationDeleteObsoletePageArgs = {
  paginaId: Scalars['String'];
};


export type MutationDeleteObsoleteUserArgs = {
  userId: Scalars['String'];
};


export type MutationDeletePersonalMessageArgs = {
  id: Scalars['String'];
  paginaId: Scalars['String'];
};


export type MutationDeletePersonalMessageAccessArgs = {
  paginaId: Scalars['String'];
  personalMessageId: Scalars['String'];
  userThatHasAccessId: Scalars['String'];
};


export type MutationDigitize_ConfirmationArgs = {
  name_of_page: Scalars['String'];
  page_id: Scalars['String'];
};


export type MutationDigitize_RequestArgs = {
  address: Scalars['String'];
  boodschap: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  tel: Scalars['String'];
};


export type MutationEmail_CollecterArgs = {
  email: Scalars['String'];
  sheet_index: Scalars['Float'];
};


export type MutationFacebookLoginArgs = {
  accessToken: Scalars['String'];
  userID: Scalars['String'];
};


export type MutationFeedbackArgs = {
  feedback: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationGoogleLoginArgs = {
  googleId: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationMediaForVideoSlideshowArgs = {
  paginaId: Scalars['String'];
};


export type MutationMultipleUploadArgs = {
  files: Array<Scalars['Upload']>;
  folder: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationRegister_PartnerArgs = {
  options: UsernamePasswordInput;
  partner_type: Scalars['Float'];
  partnerdata: PartnerDataInput;
};


export type MutationRequestToVerifyAccountArgs = {
  email: Scalars['String'];
};


export type MutationRevokeRefreshTokensForUserArgs = {
  userId: Scalars['String'];
};


export type MutationSingleUploadArgs = {
  file: Scalars['Upload'];
  folder: Scalars['String'];
};


export type MutationSubscribeArgs = {
  boodschap: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  tel: Scalars['String'];
};


export type MutationUpdateCommentArgs = {
  comment: Scalars['String'];
  id: Scalars['String'];
  paginaId: Scalars['String'];
};


export type MutationUpdateCondolatieArgs = {
  id: Scalars['String'];
  paginaId: Scalars['String'];
  text: Scalars['String'];
};


export type MutationUpdateHerdenkingsPaginaArgs = {
  DesignType: Scalars['Float'];
  DoB: Scalars['DateTime'];
  DoD?: Maybe<Scalars['DateTime']>;
  condoleance_active: Scalars['Boolean'];
  control_before: Scalars['Boolean'];
  mediaUrl: Scalars['String'];
  name_of_page: Scalars['String'];
  paginaId: Scalars['String'];
  text: Scalars['String'];
};


export type MutationUpdateHerinneringArgs = {
  categorie?: Maybe<Scalars['Float']>;
  datumVanHerinnering?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  ontimeline?: Maybe<Scalars['Boolean']>;
  paginaId: Scalars['String'];
  status?: Maybe<Scalars['Float']>;
  text?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};


export type MutationUpdateMediaArgs = {
  datumVanMedia: Scalars['DateTime'];
  id: Scalars['String'];
  text: Scalars['String'];
  title: Scalars['String'];
};


export type MutationUpdatePersonalMessageArgs = {
  dateAvailable?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  paginaId: Scalars['String'];
  text: Scalars['String'];
  title: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  email: Scalars['String'];
  username: Scalars['String'];
};


export type MutationValidateOwnershipArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationVerifyAccountArgs = {
  token: Scalars['String'];
};


export type MutationVerifyPartnerArgs = {
  partnerId: Scalars['String'];
};

export type PaginatedCondolaties = {
  __typename?: 'PaginatedCondolaties';
  condolaties: Array<Condolatie>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedHerinneringen = {
  __typename?: 'PaginatedHerinneringen';
  hasMore: Scalars['Boolean'];
  herinneringen: Array<Herinnering>;
};

export type PaginatedMediaHerinneringen = {
  __typename?: 'PaginatedMediaHerinneringen';
  hasMore: Scalars['Boolean'];
  mediaHerinneringen: Array<MediaHerinnering>;
};

export type PaginatedMessages = {
  __typename?: 'PaginatedMessages';
  berichten: Array<Message>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedPersonalMessages = {
  __typename?: 'PaginatedPersonalMessages';
  PersonalMessages: Array<PersonalMessage>;
  hasMore: Scalars['Boolean'];
};

export type PartnerDataInput = {
  city: Scalars['String'];
  city_postcode: Scalars['String'];
  country: Scalars['String'];
  mobile_phone: Scalars['String'];
  name_partner: Scalars['String'];
  street: Scalars['String'];
  street_number: Scalars['String'];
  vat_number: Scalars['String'];
};

export type PartnerResponse = {
  __typename?: 'PartnerResponse';
  email: Scalars['String'];
  id: Scalars['String'];
  mobile_phone: Scalars['String'];
  userId: Scalars['String'];
  username: Scalars['String'];
  vat_number: Scalars['String'];
};

export type PersonalMessage = {
  __typename?: 'PersonalMessage';
  createdAt: Scalars['String'];
  dateAvailable?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  media: Array<MediaPersonalMessage>;
  pagina?: Maybe<HerdenkingsPagina>;
  paginaId?: Maybe<Scalars['String']>;
  personalMessagesAccess?: Maybe<Array<PersonalMessageAccess>>;
  text: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type PersonalMessageAccess = {
  __typename?: 'PersonalMessageAccess';
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  pageId: Scalars['String'];
  personalMessage: PersonalMessage;
  personalMessageId: Scalars['String'];
  updatedAt: Scalars['String'];
  userThatHasAccess: User;
  userThatHasAccessId: Scalars['String'];
};

export type PersonalMessageInput = {
  dateAvailable?: Maybe<Scalars['DateTime']>;
  text: Scalars['String'];
  title: Scalars['String'];
};

export type PersonalMessageResponse = {
  __typename?: 'PersonalMessageResponse';
  errors?: Maybe<Array<FieldError>>;
  pma?: Maybe<PersonalMessageAccess>;
};

export type Query = {
  __typename?: 'Query';
  accessRequestsByUserId: Array<AccessRequest>;
  addObjectSizeToMedia: Scalars['Boolean'];
  addObjectSizeToMediaAllPages: Scalars['Boolean'];
  allPartners: Array<PartnerResponse>;
  checkAllObjectsByUser: Scalars['Boolean'];
  checkAllObjectsForPage: Scalars['Boolean'];
  checkBetaling: CheckpaymentResponse;
  checkForPersonalMessages: Scalars['Boolean'];
  checkMegabyteForAllPages: Scalars['Boolean'];
  checkMegabytePerPage: Scalars['Boolean'];
  commentById?: Maybe<Comment>;
  condolatie?: Maybe<Condolatie>;
  condolaties: PaginatedCondolaties;
  condolaties_demo: PaginatedCondolaties;
  findAllPagesWithoutObjects: Array<Scalars['String']>;
  findAllPersonalMessagesOfCurrentUserForCurrentPage?: Maybe<Array<PersonalMessage>>;
  findAllUsersThatHaveAccesPerPersonalMessage: Array<PersonalMessageAccess>;
  findAllUsersWithoutObjects: Array<Scalars['String']>;
  findEmailsOfAllOwnersOfPages: Scalars['Boolean'];
  getMollieSubscriptionForPage: SubscriptionInfo;
  getMollieSubscriptions: Scalars['String'];
  hello: Scalars['String'];
  herdenkingspagina?: Maybe<HerdenkingsPagina>;
  herdenkingspaginaByOwnerId?: Maybe<Array<HerdenkingsPagina>>;
  herdenkingspaginaprivatetoken?: Maybe<HerdenkingsPagina>;
  herinnering: Herinnering;
  herinnering_demo: Herinnering;
  herinneringen: PaginatedHerinneringen;
  herinneringenByDate: Array<Herinnering>;
  herinneringenByDate_demo: Array<Herinnering>;
  herinneringen_demo: PaginatedHerinneringen;
  herinneringen_gallerij: PaginatedMediaHerinneringen;
  herinneringen_gallerij_demo: PaginatedMediaHerinneringen;
  indexPage: IndexPageResponse;
  me?: Maybe<MeResponse>;
  mediaById?: Maybe<Media>;
  mediaCondolatieById?: Maybe<MediaCondolatie>;
  mediaHerinneringById?: Maybe<MediaHerinnering>;
  mediaMessageById?: Maybe<MediaMessage>;
  mediaPersonalMessageById?: Maybe<MediaPersonalMessage>;
  message: Message;
  messages: PaginatedMessages;
  messages_demo: PaginatedMessages;
  ownMessages: PaginatedMessages;
  personalMessages: PaginatedPersonalMessages;
  personalMessagesAccessForCurrentPage?: Maybe<Array<PersonalMessageAccess>>;
  personalMessagesAccessForPersonalMessage?: Maybe<Array<PersonalMessageAccess>>;
  personalmessage: PersonalMessage;
  personalmessage_demo: PersonalMessage;
  personalmessages_demo?: Maybe<Array<PersonalMessage>>;
  requestsByPaginaId: Array<AccessRequest>;
  requestsByPaginaId_demo: Array<AccessRequest>;
};


export type QueryAddObjectSizeToMediaArgs = {
  pageId: Scalars['String'];
};


export type QueryCheckAllObjectsByUserArgs = {
  userId: Scalars['String'];
};


export type QueryCheckAllObjectsForPageArgs = {
  paginaId: Scalars['String'];
};


export type QueryCheckBetalingArgs = {
  redis_payment_mollie_id: Scalars['String'];
};


export type QueryCheckForPersonalMessagesArgs = {
  paginaId: Scalars['String'];
};


export type QueryCheckMegabytePerPageArgs = {
  pageId: Scalars['String'];
};


export type QueryCommentByIdArgs = {
  id: Scalars['Float'];
};


export type QueryCondolatieArgs = {
  id: Scalars['String'];
  paginaId: Scalars['String'];
};


export type QueryCondolatiesArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
  paginaId: Scalars['String'];
};


export type QueryCondolaties_DemoArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
  paginaId: Scalars['String'];
};


export type QueryFindAllPersonalMessagesOfCurrentUserForCurrentPageArgs = {
  paginaId: Scalars['String'];
};


export type QueryFindAllUsersThatHaveAccesPerPersonalMessageArgs = {
  paginaId: Scalars['String'];
  personalMessageid: Scalars['String'];
};


export type QueryGetMollieSubscriptionForPageArgs = {
  public_token: Scalars['String'];
};


export type QueryGetMollieSubscriptionsArgs = {
  public_token: Scalars['String'];
};


export type QueryHerdenkingspaginaArgs = {
  paginaId: Scalars['String'];
};


export type QueryHerdenkingspaginaprivatetokenArgs = {
  paginaId: Scalars['String'];
};


export type QueryHerinneringArgs = {
  id: Scalars['String'];
  paginaId: Scalars['String'];
};


export type QueryHerinnering_DemoArgs = {
  id: Scalars['String'];
  paginaId: Scalars['String'];
};


export type QueryHerinneringenArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
  paginaId: Scalars['String'];
};


export type QueryHerinneringenByDateArgs = {
  paginaId: Scalars['String'];
};


export type QueryHerinneringenByDate_DemoArgs = {
  paginaId: Scalars['String'];
};


export type QueryHerinneringen_DemoArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
  paginaId: Scalars['String'];
};


export type QueryHerinneringen_GallerijArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
  paginaId: Scalars['String'];
};


export type QueryHerinneringen_Gallerij_DemoArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
  paginaId: Scalars['String'];
};


export type QueryIndexPageArgs = {
  public_or_private_token: Scalars['String'];
};


export type QueryMeArgs = {
  paginaId?: Maybe<Scalars['String']>;
};


export type QueryMediaByIdArgs = {
  id: Scalars['String'];
};


export type QueryMediaCondolatieByIdArgs = {
  id: Scalars['String'];
  paginaId: Scalars['String'];
};


export type QueryMediaHerinneringByIdArgs = {
  id: Scalars['String'];
  paginaId: Scalars['String'];
};


export type QueryMediaMessageByIdArgs = {
  id: Scalars['String'];
  paginaId: Scalars['String'];
};


export type QueryMediaPersonalMessageByIdArgs = {
  id: Scalars['String'];
  paginaId: Scalars['String'];
};


export type QueryMessageArgs = {
  id: Scalars['String'];
  paginaId: Scalars['String'];
};


export type QueryMessagesArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
  paginaId: Scalars['String'];
};


export type QueryMessages_DemoArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
  paginaId: Scalars['String'];
};


export type QueryOwnMessagesArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
  paginaId: Scalars['String'];
};


export type QueryPersonalMessagesArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
  paginaId: Scalars['String'];
};


export type QueryPersonalMessagesAccessForCurrentPageArgs = {
  paginaId: Scalars['String'];
};


export type QueryPersonalMessagesAccessForPersonalMessageArgs = {
  paginaId: Scalars['String'];
  personalmessage_id: Scalars['String'];
};


export type QueryPersonalmessageArgs = {
  id: Scalars['String'];
  paginaId: Scalars['String'];
};


export type QueryPersonalmessage_DemoArgs = {
  id: Scalars['String'];
  paginaId: Scalars['String'];
};


export type QueryPersonalmessages_DemoArgs = {
  paginaId: Scalars['String'];
};


export type QueryRequestsByPaginaIdArgs = {
  paginaId: Scalars['String'];
};


export type QueryRequestsByPaginaId_DemoArgs = {
  paginaId: Scalars['String'];
};

export type SubscriptionInfo = {
  __typename?: 'SubscriptionInfo';
  description?: Maybe<Scalars['String']>;
  interval?: Maybe<Scalars['String']>;
  mollieSubscriptionId?: Maybe<Scalars['String']>;
  nextPaymentDate?: Maybe<Scalars['String']>;
  payment_plan?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};


export type UploadedFileResponse = {
  __typename?: 'UploadedFileResponse';
  encoding: Scalars['String'];
  filename: Scalars['String'];
  mimetype: Scalars['String'];
  url: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  FacebookId: Scalars['String'];
  GoogleId: Scalars['String'];
  accessrequests: Array<AccessRequest>;
  account_status: Scalars['Float'];
  comments: Comment;
  condolaties: Condolatie;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  herdenkingsPaginaTheUserOwns: HerdenkingsPagina;
  herinneringen: Herinnering;
  id: Scalars['String'];
  mediaUploads: Media;
  messages: Message;
  mollieCustomerId: Scalars['String'];
  personalMessages: Array<PersonalMessageAccess>;
  tokenVersion: Scalars['Float'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type PaymentResponse = {
  __typename?: 'paymentResponse';
  pay_id: Scalars['String'];
  pay_link: Scalars['String'];
};

export type IndexPageHerdenkingsPaginaFragment = (
  { __typename?: 'HerdenkingsPagina' }
  & Pick<HerdenkingsPagina, 'id' | 'mediaUrl' | 'name_of_page' | 'text' | 'DoB' | 'DoD' | 'condoleance_active' | 'shareable' | 'accessible' | 'control_before' | 'number_of_people' | 'Payment_plan' | 'DesignType'>
);

export type MemorySnippetFragment = (
  { __typename?: 'Herinnering' }
  & Pick<Herinnering, 'id' | 'title' | 'text' | 'categorie'>
  & { creator: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  ), media: Array<(
    { __typename?: 'MediaHerinnering' }
    & Pick<MediaHerinnering, 'text' | 'title' | 'urlFile'>
  )>, comments: Array<(
    { __typename?: 'CommentHerinnering' }
    & Pick<CommentHerinnering, 'id' | 'comment'>
  )> }
);

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'LoginResponse' }
  & Pick<LoginResponse, 'accessToken'>
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type Invite_PeopleMutationVariables = Exact<{
  email: Scalars['String'];
  username: Scalars['String'];
  public_token: Scalars['String'];
}>;


export type Invite_PeopleMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'Invite_people'>
);

export type AddMediaUrlMutationVariables = Exact<{
  paginaId: Scalars['String'];
  mediaUrl: Scalars['String'];
}>;


export type AddMediaUrlMutation = (
  { __typename?: 'Mutation' }
  & { addMediaUrl?: Maybe<(
    { __typename?: 'HerdenkingsPagina' }
    & Pick<HerdenkingsPagina, 'id' | 'mediaUrl'>
  )> }
);

export type CancelMollieSubscriptionMutationVariables = Exact<{
  public_token: Scalars['String'];
  MollieSubscriptionId: Scalars['String'];
}>;


export type CancelMollieSubscriptionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'cancelMollieSubscription'>
);

export type ChangeMemoryOnTimelineStateMutationVariables = Exact<{
  id: Scalars['String'];
  status: Scalars['Boolean'];
  paginaId: Scalars['String'];
}>;


export type ChangeMemoryOnTimelineStateMutation = (
  { __typename?: 'Mutation' }
  & { changeMemoryOnTimelineState?: Maybe<(
    { __typename?: 'Herinnering' }
    & Pick<Herinnering, 'id' | 'status' | 'on_timeline'>
  )> }
);

export type ChangeMemorsdqfyStatusMutationVariables = Exact<{
  id: Scalars['String'];
  status: Scalars['Float'];
  paginaId: Scalars['String'];
}>;


export type ChangeMemorsdqfyStatusMutation = (
  { __typename?: 'Mutation' }
  & { changeMemoryStatus?: Maybe<(
    { __typename?: 'Herinnering' }
    & Pick<Herinnering, 'id' | 'status' | 'on_timeline'>
  )> }
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'changePassword'>
);

export type ChangeStatusAccessRequestMutationVariables = Exact<{
  paginaId: Scalars['String'];
  id: Scalars['String'];
  status: Scalars['Float'];
}>;


export type ChangeStatusAccessRequestMutation = (
  { __typename?: 'Mutation' }
  & { changeStatusAccessRequest: (
    { __typename?: 'AccessRequest' }
    & Pick<AccessRequest, 'id' | 'status' | 'requestorId'>
  ) }
);

export type CreateAccesRequestMutationVariables = Exact<{
  paginaId: Scalars['String'];
  requestor_username: Scalars['String'];
  requesttext: Scalars['String'];
}>;


export type CreateAccesRequestMutation = (
  { __typename?: 'Mutation' }
  & { createAccessRequest: (
    { __typename?: 'AccessRequest' }
    & Pick<AccessRequest, 'id' | 'requestorId' | 'paginaId' | 'requesttext'>
  ) }
);

export type CreateCommentHerinneringMutationVariables = Exact<{
  herinneringId: Scalars['String'];
  comment: Scalars['String'];
  paginaId: Scalars['String'];
}>;


export type CreateCommentHerinneringMutation = (
  { __typename?: 'Mutation' }
  & { createCommentHerinnering: (
    { __typename?: 'CommentHerinnering' }
    & Pick<CommentHerinnering, 'id' | 'comment'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'username'>
    ) }
  ) }
);

export type CreateCondolatieMutationVariables = Exact<{
  paginaId: Scalars['String'];
  input: CondolatieInput;
}>;


export type CreateCondolatieMutation = (
  { __typename?: 'Mutation' }
  & { createCondolatie: (
    { __typename?: 'Condolatie' }
    & Pick<Condolatie, 'id' | 'text' | 'createdAt' | 'updatedAt' | 'textSnippet'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  ) }
);

export type CreateHerdenkingspaginaMutationVariables = Exact<{
  input: HerdenkingsPaginaInput;
  DoD?: Maybe<Scalars['DateTime']>;
}>;


export type CreateHerdenkingspaginaMutation = (
  { __typename?: 'Mutation' }
  & { createHerdenkingspagina: (
    { __typename?: 'HerdenkingsPaginaResponse' }
    & Pick<HerdenkingsPaginaResponse, 'accessToken'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, herdenkingspagina?: Maybe<(
      { __typename?: 'HerdenkingsPagina' }
      & Pick<HerdenkingsPagina, 'id' | 'name_of_page'>
      & { owner: (
        { __typename?: 'User' }
        & Pick<User, 'id'>
      ) }
    )> }
  ) }
);

export type CreateHerinneringMutationVariables = Exact<{
  paginaId: Scalars['String'];
  input: HerinneringInput;
  status?: Maybe<Scalars['Float']>;
}>;


export type CreateHerinneringMutation = (
  { __typename?: 'Mutation' }
  & { createHerinnering: (
    { __typename?: 'Herinnering' }
    & Pick<Herinnering, 'id' | 'title' | 'text' | 'categorie' | 'datumVanHerinnering'>
  ) }
);

export type CreateLevenstijdlijnBetalingMutationVariables = Exact<{
  public_token: Scalars['String'];
  payment_term: Scalars['Float'];
  payment_plan: Scalars['Float'];
}>;


export type CreateLevenstijdlijnBetalingMutation = (
  { __typename?: 'Mutation' }
  & { createLevenstijdlijnBetaling: (
    { __typename?: 'paymentResponse' }
    & Pick<PaymentResponse, 'pay_id' | 'pay_link'>
  ) }
);

export type CreateLevenstijdlijnDomicilieringMutationVariables = Exact<{
  public_token: Scalars['String'];
  payment_term: Scalars['Float'];
  payment_plan: Scalars['Float'];
}>;


export type CreateLevenstijdlijnDomicilieringMutation = (
  { __typename?: 'Mutation' }
  & { createLevenstijdlijnDomiciliering: (
    { __typename?: 'paymentResponse' }
    & Pick<PaymentResponse, 'pay_id' | 'pay_link'>
  ) }
);

export type CreateMediaCondolatieMutationVariables = Exact<{
  condolatieId: Scalars['String'];
  input: MediaInput;
  paginaId: Scalars['String'];
}>;


export type CreateMediaCondolatieMutation = (
  { __typename?: 'Mutation' }
  & { createMediaCondolatie: (
    { __typename?: 'MediaCondolatie' }
    & Pick<MediaCondolatie, 'id' | 'title' | 'urlFile'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  ) }
);

export type CreateMediaHerinneringMutationVariables = Exact<{
  input: MediaInput;
  herinneringId: Scalars['String'];
  paginaId: Scalars['String'];
}>;


export type CreateMediaHerinneringMutation = (
  { __typename?: 'Mutation' }
  & { createMediaHerinnering: (
    { __typename?: 'MediaHerinnering' }
    & Pick<MediaHerinnering, 'id' | 'text' | 'creatorId' | 'urlFile'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  ) }
);

export type CreateMediaMessageMutationVariables = Exact<{
  input: MediaInput;
  messageId: Scalars['String'];
  paginaId: Scalars['String'];
}>;


export type CreateMediaMessageMutation = (
  { __typename?: 'Mutation' }
  & { createMediaMessage: (
    { __typename?: 'MediaMessage' }
    & Pick<MediaMessage, 'id' | 'text' | 'creatorId' | 'urlFile'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  ) }
);

export type CreateMediaPersonalMessageMutationVariables = Exact<{
  input: MediaInput;
  pmessageId: Scalars['String'];
  paginaId: Scalars['String'];
}>;


export type CreateMediaPersonalMessageMutation = (
  { __typename?: 'Mutation' }
  & { createMediaPersonalMessage: (
    { __typename?: 'MediaPersonalMessage' }
    & Pick<MediaPersonalMessage, 'id' | 'text' | 'creatorId' | 'urlFile'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  ) }
);

export type CreateMessageMutationVariables = Exact<{
  paginaId: Scalars['String'];
  input: MessageInput;
}>;


export type CreateMessageMutation = (
  { __typename?: 'Mutation' }
  & { createMessage: (
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'text' | 'status'>
  ) }
);

export type CreatePartnerHerdenkingspaginaMutationVariables = Exact<{
  input: HerdenkingsPaginaInput;
  partner_name: Scalars['String'];
  partner_email: Scalars['String'];
  partner_type: Scalars['Float'];
  DoD?: Maybe<Scalars['DateTime']>;
  info_administrator?: Maybe<UsernamePasswordInput>;
}>;


export type CreatePartnerHerdenkingspaginaMutation = (
  { __typename?: 'Mutation' }
  & { createPartnerHerdenkingspagina: (
    { __typename?: 'HerdenkingsPaginaResponse' }
    & Pick<HerdenkingsPaginaResponse, 'accessToken'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, herdenkingspagina?: Maybe<(
      { __typename?: 'HerdenkingsPagina' }
      & Pick<HerdenkingsPagina, 'id' | 'name_of_page'>
      & { owner: (
        { __typename?: 'User' }
        & Pick<User, 'id'>
      ) }
    )> }
  ) }
);

export type CreatePersonalMessageMutationVariables = Exact<{
  input: PersonalMessageInput;
  paginaId: Scalars['String'];
}>;


export type CreatePersonalMessageMutation = (
  { __typename?: 'Mutation' }
  & { createPersonalMessage: (
    { __typename?: 'PersonalMessage' }
    & Pick<PersonalMessage, 'id' | 'title' | 'paginaId'>
  ) }
);

export type CreatePersonalMessageAccessMutationVariables = Exact<{
  userId: Scalars['String'];
  personalMessageId: Scalars['String'];
  paginaId: Scalars['String'];
}>;


export type CreatePersonalMessageAccessMutation = (
  { __typename?: 'Mutation' }
  & { createPersonalMessageAccess: (
    { __typename?: 'PersonalMessageResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, pma?: Maybe<(
      { __typename?: 'PersonalMessageAccess' }
      & Pick<PersonalMessageAccess, 'id'>
    )> }
  ) }
);

export type DeleteCommentMutationVariables = Exact<{
  paginaId: Scalars['String'];
  id: Scalars['String'];
}>;


export type DeleteCommentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteComment'>
);

export type DeleteCondolatieMutationVariables = Exact<{
  id: Scalars['String'];
  paginaId: Scalars['String'];
}>;


export type DeleteCondolatieMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteCondolatie'>
);

export type DeleteHerinneringMutationVariables = Exact<{
  id: Scalars['String'];
  paginaId: Scalars['String'];
}>;


export type DeleteHerinneringMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteHerinnering'>
);

export type DeleteMediaMutationVariables = Exact<{
  id: Scalars['String'];
  paginaId: Scalars['String'];
}>;


export type DeleteMediaMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteMedia'>
);

export type DeletePersonalMessageAccessMutationVariables = Exact<{
  userThatHasAccessId: Scalars['String'];
  personalMessageId: Scalars['String'];
  paginaId: Scalars['String'];
}>;


export type DeletePersonalMessageAccessMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePersonalMessageAccess'>
);

export type DeletePersonalMessageMutationVariables = Exact<{
  id: Scalars['String'];
  paginaId: Scalars['String'];
}>;


export type DeletePersonalMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePersonalMessage'>
);

export type Digitize_RequestMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  tel: Scalars['String'];
  address: Scalars['String'];
  boodschap: Scalars['String'];
}>;


export type Digitize_RequestMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'digitize_request'>
);

export type Digitize_ConfirmationMutationVariables = Exact<{
  name_of_page: Scalars['String'];
  page_id: Scalars['String'];
}>;


export type Digitize_ConfirmationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'digitize_confirmation'>
);

export type Email_CollecterMutationVariables = Exact<{
  email: Scalars['String'];
  sheet_index: Scalars['Float'];
}>;


export type Email_CollecterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'email_collecter'>
);

export type FacebookLoginMutationVariables = Exact<{
  accessToken: Scalars['String'];
  userID: Scalars['String'];
}>;


export type FacebookLoginMutation = (
  { __typename?: 'Mutation' }
  & { facebookLogin: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type FeedbackMutationVariables = Exact<{
  userId: Scalars['String'];
  feedback: Scalars['String'];
}>;


export type FeedbackMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'feedback'>
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type GoogleLoginMutationVariables = Exact<{
  googleId: Scalars['String'];
}>;


export type GoogleLoginMutation = (
  { __typename?: 'Mutation' }
  & { googleLogin: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MediaForVideoSlideshowMutationVariables = Exact<{
  paginaId: Scalars['String'];
}>;


export type MediaForVideoSlideshowMutation = (
  { __typename?: 'Mutation' }
  & { mediaForVideoSlideshow: Array<(
    { __typename?: 'MediaHerinnering' }
    & Pick<MediaHerinnering, 'id' | 'urlFile'>
  )> }
);

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type Register_PartnerMutationVariables = Exact<{
  options: UsernamePasswordInput;
  partner_type: Scalars['Float'];
  partnerdata: PartnerDataInput;
}>;


export type Register_PartnerMutation = (
  { __typename?: 'Mutation' }
  & { register_partner: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type RequestToVerifyAccountMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type RequestToVerifyAccountMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'requestToVerifyAccount'>
);

export type SubscribeMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  tel: Scalars['String'];
  boodschap: Scalars['String'];
}>;


export type SubscribeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'subscribe'>
);

export type UpdateCommentMutationVariables = Exact<{
  paginaId: Scalars['String'];
  id: Scalars['String'];
  comment: Scalars['String'];
}>;


export type UpdateCommentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateComment'>
);

export type UpdateCondolatieMutationVariables = Exact<{
  text: Scalars['String'];
  id: Scalars['String'];
  paginaId: Scalars['String'];
}>;


export type UpdateCondolatieMutation = (
  { __typename?: 'Mutation' }
  & { updateCondolatie?: Maybe<(
    { __typename?: 'Condolatie' }
    & Pick<Condolatie, 'id' | 'text' | 'creatorId' | 'createdAt' | 'updatedAt' | 'textSnippet'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  )> }
);

export type UpdateHerdenkingsPaginaMutationVariables = Exact<{
  paginaId: Scalars['String'];
  name_of_page: Scalars['String'];
  DesignType: Scalars['Float'];
  mediaUrl: Scalars['String'];
  text: Scalars['String'];
  condoleance_active: Scalars['Boolean'];
  DoD?: Maybe<Scalars['DateTime']>;
  DoB: Scalars['DateTime'];
  control_before: Scalars['Boolean'];
}>;


export type UpdateHerdenkingsPaginaMutation = (
  { __typename?: 'Mutation' }
  & { updateHerdenkingsPagina?: Maybe<(
    { __typename?: 'HerdenkingsPagina' }
    & Pick<HerdenkingsPagina, 'id' | 'name_of_page' | 'ownerId'>
    & { owner: (
      { __typename?: 'User' }
      & Pick<User, 'username'>
    ) }
  )> }
);

export type UpdateHerinneringMutationVariables = Exact<{
  text?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  categorie?: Maybe<Scalars['Float']>;
  datumVanHerinnering?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  paginaId: Scalars['String'];
  ontimeline?: Maybe<Scalars['Boolean']>;
  status?: Maybe<Scalars['Float']>;
}>;


export type UpdateHerinneringMutation = (
  { __typename?: 'Mutation' }
  & { updateHerinnering?: Maybe<(
    { __typename?: 'Herinnering' }
    & Pick<Herinnering, 'id' | 'text'>
  )> }
);

export type UpdateMediaMutationVariables = Exact<{
  datumVanMedia: Scalars['DateTime'];
  text: Scalars['String'];
  title: Scalars['String'];
  id: Scalars['String'];
}>;


export type UpdateMediaMutation = (
  { __typename?: 'Mutation' }
  & { updateMedia?: Maybe<(
    { __typename?: 'Media' }
    & Pick<Media, 'id' | 'title' | 'text'>
  )> }
);

export type UpdatePasswordMutationVariables = Exact<{
  oldpassword: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type UpdatePasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'UpdatePassword'>
);

export type UpdatePersonalMessageMutationVariables = Exact<{
  id: Scalars['String'];
  title: Scalars['String'];
  text: Scalars['String'];
  dateAvailable: Scalars['DateTime'];
  paginaId: Scalars['String'];
}>;


export type UpdatePersonalMessageMutation = (
  { __typename?: 'Mutation' }
  & { updatePersonalMessage?: Maybe<(
    { __typename?: 'PersonalMessage' }
    & Pick<PersonalMessage, 'id' | 'title' | 'text' | 'dateAvailable'>
  )> }
);

export type UpdateUserMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateUser'>
);

export type VerifyAccountMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type VerifyAccountMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'verifyAccount'>
);

export type VerifyPartnerMutationVariables = Exact<{
  partnerId: Scalars['String'];
}>;


export type VerifyPartnerMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'verifyPartner'>
);

export type AccessRequestsByUserIdQueryVariables = Exact<{ [key: string]: never; }>;


export type AccessRequestsByUserIdQuery = (
  { __typename?: 'Query' }
  & { accessRequestsByUserId: Array<(
    { __typename?: 'AccessRequest' }
    & Pick<AccessRequest, 'id' | 'paginaId' | 'status' | 'requesttext'>
    & { requestor: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ), pagina: (
      { __typename?: 'HerdenkingsPagina' }
      & Pick<HerdenkingsPagina, 'name_of_page' | 'mediaUrl' | 'DoB' | 'DoD' | 'text' | 'private_token'>
    ) }
  )> }
);

export type CheckBetalingQueryVariables = Exact<{
  redis_payment_mollie_id: Scalars['String'];
}>;


export type CheckBetalingQuery = (
  { __typename?: 'Query' }
  & { checkBetaling: (
    { __typename?: 'CheckpaymentResponse' }
    & Pick<CheckpaymentResponse, 'status' | 'aantal_dagen'>
  ) }
);

export type CheckForPersonalMessagesQueryVariables = Exact<{
  paginaId: Scalars['String'];
}>;


export type CheckForPersonalMessagesQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'checkForPersonalMessages'>
);

export type CondolatieQueryVariables = Exact<{
  id: Scalars['String'];
  paginaId: Scalars['String'];
}>;


export type CondolatieQuery = (
  { __typename?: 'Query' }
  & { condolatie?: Maybe<(
    { __typename?: 'Condolatie' }
    & Pick<Condolatie, 'id' | 'text'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ), media: Array<(
      { __typename?: 'MediaCondolatie' }
      & Pick<MediaCondolatie, 'id' | 'urlFile'>
    )> }
  )> }
);

export type CondolatiesQueryVariables = Exact<{
  paginaId: Scalars['String'];
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type CondolatiesQuery = (
  { __typename?: 'Query' }
  & { condolaties: (
    { __typename?: 'PaginatedCondolaties' }
    & Pick<PaginatedCondolaties, 'hasMore'>
    & { condolaties: Array<(
      { __typename?: 'Condolatie' }
      & Pick<Condolatie, 'id' | 'text' | 'createdAt'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'username'>
      ), media: Array<(
        { __typename?: 'MediaCondolatie' }
        & Pick<MediaCondolatie, 'id' | 'urlFile' | 'mediaType'>
      )> }
    )> }
  ) }
);

export type Condolaties_DemoQueryVariables = Exact<{
  paginaId: Scalars['String'];
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type Condolaties_DemoQuery = (
  { __typename?: 'Query' }
  & { condolaties_demo: (
    { __typename?: 'PaginatedCondolaties' }
    & Pick<PaginatedCondolaties, 'hasMore'>
    & { condolaties: Array<(
      { __typename?: 'Condolatie' }
      & Pick<Condolatie, 'id' | 'text' | 'createdAt'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'username'>
      ), media: Array<(
        { __typename?: 'MediaCondolatie' }
        & Pick<MediaCondolatie, 'id' | 'urlFile' | 'mediaType'>
      )> }
    )> }
  ) }
);

export type FindAllPersonalMessagesOfCurrentUserForCurrentPageQueryVariables = Exact<{
  paginaId: Scalars['String'];
}>;


export type FindAllPersonalMessagesOfCurrentUserForCurrentPageQuery = (
  { __typename?: 'Query' }
  & { findAllPersonalMessagesOfCurrentUserForCurrentPage?: Maybe<Array<(
    { __typename?: 'PersonalMessage' }
    & Pick<PersonalMessage, 'id' | 'title' | 'text' | 'dateAvailable' | 'updatedAt' | 'createdAt'>
    & { media: Array<(
      { __typename?: 'MediaPersonalMessage' }
      & Pick<MediaPersonalMessage, 'urlFile' | 'mediaType' | 'id' | 'creatorId'>
    )> }
  )>> }
);

export type GetMollieSubscriptionForPageQueryVariables = Exact<{
  public_token: Scalars['String'];
}>;


export type GetMollieSubscriptionForPageQuery = (
  { __typename?: 'Query' }
  & { getMollieSubscriptionForPage: (
    { __typename?: 'SubscriptionInfo' }
    & Pick<SubscriptionInfo, 'mollieSubscriptionId' | 'nextPaymentDate' | 'startDate' | 'status' | 'description' | 'interval' | 'payment_plan'>
  ) }
);

export type GetMollieSubscriptionsQueryVariables = Exact<{
  public_token: Scalars['String'];
}>;


export type GetMollieSubscriptionsQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'getMollieSubscriptions'>
);

export type HerdenkingspaginaQueryVariables = Exact<{
  paginaId: Scalars['String'];
}>;


export type HerdenkingspaginaQuery = (
  { __typename?: 'Query' }
  & { herdenkingspagina?: Maybe<(
    { __typename?: 'HerdenkingsPagina' }
    & Pick<HerdenkingsPagina, 'id' | 'name_of_page' | 'condoleance_active' | 'shareable' | 'accessible' | 'control_before' | 'DesignType' | 'DoB' | 'DoD' | 'ValidUntil' | 'mediaUrl' | 'text' | 'number_of_memories' | 'Payment_plan' | 'Payment_status' | 'number_of_personal_messages' | 'number_of_messages' | 'number_of_condolances' | 'number_of_media' | 'number_of_people' | 'number_of_bytes'>
    & { owner: (
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id'>
    ) }
  )> }
);

export type HerdenkingspaginaprivatetokenQueryVariables = Exact<{
  paginaId: Scalars['String'];
}>;


export type HerdenkingspaginaprivatetokenQuery = (
  { __typename?: 'Query' }
  & { herdenkingspaginaprivatetoken?: Maybe<(
    { __typename?: 'HerdenkingsPagina' }
    & Pick<HerdenkingsPagina, 'id' | 'name_of_page' | 'DoB' | 'DoD' | 'Payment_plan' | 'Payment_status' | 'condoleance_active' | 'control_before' | 'shareable' | 'accessible' | 'createdAt' | 'mediaUrl' | 'text' | 'private_token' | 'ValidUntil' | 'number_of_memories' | 'number_of_personal_messages' | 'number_of_messages' | 'number_of_condolances' | 'number_of_media' | 'number_of_people' | 'number_of_bytes'>
    & { owner: (
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id'>
    ) }
  )> }
);

export type HerinneringQueryVariables = Exact<{
  id: Scalars['String'];
  paginaId: Scalars['String'];
}>;


export type HerinneringQuery = (
  { __typename?: 'Query' }
  & { herinnering: (
    { __typename?: 'Herinnering' }
    & Pick<Herinnering, 'id' | 'title' | 'text' | 'categorie' | 'status' | 'on_timeline' | 'datumVanHerinnering'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ), media: Array<(
      { __typename?: 'MediaHerinnering' }
      & Pick<MediaHerinnering, 'id' | 'text' | 'title' | 'urlFile' | 'mediaType'>
    )>, comments: Array<(
      { __typename?: 'CommentHerinnering' }
      & Pick<CommentHerinnering, 'id' | 'comment' | 'createdAt'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
      ) }
    )> }
  ) }
);

export type Herinnering_DemoQueryVariables = Exact<{
  id: Scalars['String'];
  paginaId: Scalars['String'];
}>;


export type Herinnering_DemoQuery = (
  { __typename?: 'Query' }
  & { herinnering_demo: (
    { __typename?: 'Herinnering' }
    & Pick<Herinnering, 'id' | 'title' | 'text' | 'categorie' | 'status' | 'on_timeline' | 'datumVanHerinnering'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ), media: Array<(
      { __typename?: 'MediaHerinnering' }
      & Pick<MediaHerinnering, 'id' | 'text' | 'title' | 'urlFile' | 'mediaType'>
    )>, comments: Array<(
      { __typename?: 'CommentHerinnering' }
      & Pick<CommentHerinnering, 'id' | 'comment' | 'createdAt'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
      ) }
    )> }
  ) }
);

export type HerinneringenQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
  paginaId: Scalars['String'];
}>;


export type HerinneringenQuery = (
  { __typename?: 'Query' }
  & { herinneringen: (
    { __typename?: 'PaginatedHerinneringen' }
    & Pick<PaginatedHerinneringen, 'hasMore'>
    & { herinneringen: Array<(
      { __typename?: 'Herinnering' }
      & Pick<Herinnering, 'id' | 'text' | 'title' | 'categorie' | 'datumVanHerinnering' | 'status' | 'createdAt'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'username'>
      ), media: Array<(
        { __typename?: 'MediaHerinnering' }
        & Pick<MediaHerinnering, 'text' | 'title' | 'urlFile' | 'mediaType'>
        & { creator: (
          { __typename?: 'User' }
          & Pick<User, 'username'>
        ) }
      )>, comments: Array<(
        { __typename?: 'CommentHerinnering' }
        & Pick<CommentHerinnering, 'id' | 'comment'>
        & { creator: (
          { __typename?: 'User' }
          & Pick<User, 'id' | 'username'>
        ) }
      )> }
    )> }
  ) }
);

export type HerinneringenByDateQueryVariables = Exact<{
  paginaId: Scalars['String'];
}>;


export type HerinneringenByDateQuery = (
  { __typename?: 'Query' }
  & { herinneringenByDate: Array<(
    { __typename?: 'Herinnering' }
    & Pick<Herinnering, 'id' | 'text' | 'title' | 'categorie' | 'status' | 'datumVanHerinnering' | 'createdAt'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'username'>
    ), media: Array<(
      { __typename?: 'MediaHerinnering' }
      & Pick<MediaHerinnering, 'text' | 'title' | 'urlFile' | 'mediaType'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'username'>
      ) }
    )>, comments: Array<(
      { __typename?: 'CommentHerinnering' }
      & Pick<CommentHerinnering, 'id' | 'comment'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
      ) }
    )> }
  )> }
);

export type HerinneringenByDate_DemoQueryVariables = Exact<{
  paginaId: Scalars['String'];
}>;


export type HerinneringenByDate_DemoQuery = (
  { __typename?: 'Query' }
  & { herinneringenByDate_demo: Array<(
    { __typename?: 'Herinnering' }
    & Pick<Herinnering, 'id' | 'text' | 'title' | 'categorie' | 'status' | 'datumVanHerinnering' | 'createdAt'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'username'>
    ), media: Array<(
      { __typename?: 'MediaHerinnering' }
      & Pick<MediaHerinnering, 'text' | 'title' | 'urlFile' | 'mediaType'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'username'>
      ) }
    )>, comments: Array<(
      { __typename?: 'CommentHerinnering' }
      & Pick<CommentHerinnering, 'id' | 'comment'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
      ) }
    )> }
  )> }
);

export type Herinneringen_DemoQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
  paginaId: Scalars['String'];
}>;


export type Herinneringen_DemoQuery = (
  { __typename?: 'Query' }
  & { herinneringen_demo: (
    { __typename?: 'PaginatedHerinneringen' }
    & Pick<PaginatedHerinneringen, 'hasMore'>
    & { herinneringen: Array<(
      { __typename?: 'Herinnering' }
      & Pick<Herinnering, 'id' | 'text' | 'title' | 'categorie' | 'datumVanHerinnering' | 'status' | 'createdAt'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'username'>
      ), media: Array<(
        { __typename?: 'MediaHerinnering' }
        & Pick<MediaHerinnering, 'text' | 'title' | 'urlFile' | 'mediaType'>
        & { creator: (
          { __typename?: 'User' }
          & Pick<User, 'username'>
        ) }
      )>, comments: Array<(
        { __typename?: 'CommentHerinnering' }
        & Pick<CommentHerinnering, 'id' | 'comment'>
        & { creator: (
          { __typename?: 'User' }
          & Pick<User, 'id' | 'username'>
        ) }
      )> }
    )> }
  ) }
);

export type Herinneringen_GallerijQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
  paginaId: Scalars['String'];
}>;


export type Herinneringen_GallerijQuery = (
  { __typename?: 'Query' }
  & { herinneringen_gallerij: (
    { __typename?: 'PaginatedMediaHerinneringen' }
    & Pick<PaginatedMediaHerinneringen, 'hasMore'>
    & { mediaHerinneringen: Array<(
      { __typename?: 'MediaHerinnering' }
      & Pick<MediaHerinnering, 'id' | 'createdAt' | 'herinneringId' | 'urlFile' | 'mediaType'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'username'>
      ) }
    )> }
  ) }
);

export type Herinneringen_Gallerij_DemoQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
  paginaId: Scalars['String'];
}>;


export type Herinneringen_Gallerij_DemoQuery = (
  { __typename?: 'Query' }
  & { herinneringen_gallerij_demo: (
    { __typename?: 'PaginatedMediaHerinneringen' }
    & Pick<PaginatedMediaHerinneringen, 'hasMore'>
    & { mediaHerinneringen: Array<(
      { __typename?: 'MediaHerinnering' }
      & Pick<MediaHerinnering, 'id' | 'createdAt' | 'herinneringId' | 'urlFile' | 'mediaType'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'username'>
      ) }
    )> }
  ) }
);

export type IndexPageQueryVariables = Exact<{
  public_or_private_token: Scalars['String'];
}>;


export type IndexPageQuery = (
  { __typename?: 'Query' }
  & { indexPage: (
    { __typename?: 'IndexPageResponse' }
    & Pick<IndexPageResponse, 'accessLevel' | 'privaat_of_publiek' | 'accessToken'>
    & { herdenkingspagina?: Maybe<(
      { __typename?: 'HerdenkingsPagina' }
      & Pick<HerdenkingsPagina, 'id' | 'mediaUrl' | 'name_of_page' | 'text' | 'DoB' | 'DoD' | 'condoleance_active' | 'shareable' | 'accessible' | 'control_before' | 'number_of_people' | 'Payment_plan' | 'DesignType'>
    )> }
  ) }
);

export type MeQueryVariables = Exact<{
  paginaId?: Maybe<Scalars['String']>;
}>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'MeResponse' }
    & Pick<MeResponse, 'status' | 'partner_type'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'account_status' | 'id' | 'email'>
    )> }
  )> }
);

export type MessagesQueryVariables = Exact<{
  paginaId: Scalars['String'];
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type MessagesQuery = (
  { __typename?: 'Query' }
  & { messages: (
    { __typename?: 'PaginatedMessages' }
    & Pick<PaginatedMessages, 'hasMore'>
    & { berichten: Array<(
      { __typename?: 'Message' }
      & Pick<Message, 'id' | 'text' | 'createdAt' | 'status'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'username'>
      ), media: Array<(
        { __typename?: 'MediaMessage' }
        & Pick<MediaMessage, 'id' | 'urlFile' | 'mediaType'>
      )> }
    )> }
  ) }
);

export type Messages_DemoQueryVariables = Exact<{
  paginaId: Scalars['String'];
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type Messages_DemoQuery = (
  { __typename?: 'Query' }
  & { messages_demo: (
    { __typename?: 'PaginatedMessages' }
    & Pick<PaginatedMessages, 'hasMore'>
    & { berichten: Array<(
      { __typename?: 'Message' }
      & Pick<Message, 'id' | 'text' | 'createdAt' | 'status'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'username'>
      ), media: Array<(
        { __typename?: 'MediaMessage' }
        & Pick<MediaMessage, 'id' | 'urlFile' | 'mediaType'>
      )> }
    )> }
  ) }
);

export type OwnMessagesQueryVariables = Exact<{
  paginaId: Scalars['String'];
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type OwnMessagesQuery = (
  { __typename?: 'Query' }
  & { ownMessages: (
    { __typename?: 'PaginatedMessages' }
    & Pick<PaginatedMessages, 'hasMore'>
    & { berichten: Array<(
      { __typename?: 'Message' }
      & Pick<Message, 'id' | 'text' | 'status' | 'createdAt'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'username'>
      ), media: Array<(
        { __typename?: 'MediaMessage' }
        & Pick<MediaMessage, 'id' | 'urlFile' | 'mediaType'>
      )> }
    )> }
  ) }
);

export type PersonalMessagesQueryVariables = Exact<{
  paginaId: Scalars['String'];
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type PersonalMessagesQuery = (
  { __typename?: 'Query' }
  & { personalMessages: (
    { __typename?: 'PaginatedPersonalMessages' }
    & Pick<PaginatedPersonalMessages, 'hasMore'>
    & { PersonalMessages: Array<(
      { __typename?: 'PersonalMessage' }
      & Pick<PersonalMessage, 'id' | 'text' | 'title' | 'paginaId' | 'dateAvailable' | 'createdAt' | 'updatedAt'>
      & { media: Array<(
        { __typename?: 'MediaPersonalMessage' }
        & Pick<MediaPersonalMessage, 'text' | 'title' | 'urlFile' | 'mediaType' | 'id' | 'creatorId' | 'createdAt' | 'updatedAt'>
        & { creator: (
          { __typename?: 'User' }
          & Pick<User, 'username'>
        ), comments: Array<(
          { __typename?: 'CommentMedia' }
          & Pick<CommentMedia, 'id'>
        )> }
      )> }
    )> }
  ) }
);

export type PersonalMessagesAccessForCurrentPageQueryVariables = Exact<{
  paginaId: Scalars['String'];
}>;


export type PersonalMessagesAccessForCurrentPageQuery = (
  { __typename?: 'Query' }
  & { personalMessagesAccessForCurrentPage?: Maybe<Array<(
    { __typename?: 'PersonalMessageAccess' }
    & Pick<PersonalMessageAccess, 'id' | 'personalMessageId'>
    & { userThatHasAccess: (
      { __typename?: 'User' }
      & Pick<User, 'email' | 'id' | 'username'>
    ) }
  )>> }
);

export type PersonalMessagesAccessForPersonalMessageQueryVariables = Exact<{
  paginaId: Scalars['String'];
  personalmessage_id: Scalars['String'];
}>;


export type PersonalMessagesAccessForPersonalMessageQuery = (
  { __typename?: 'Query' }
  & { personalMessagesAccessForPersonalMessage?: Maybe<Array<(
    { __typename?: 'PersonalMessageAccess' }
    & { userThatHasAccess: (
      { __typename?: 'User' }
      & Pick<User, 'email' | 'id' | 'username'>
    ) }
  )>> }
);

export type PersonalMessageQueryVariables = Exact<{
  id: Scalars['String'];
  paginaId: Scalars['String'];
}>;


export type PersonalMessageQuery = (
  { __typename?: 'Query' }
  & { personalmessage: (
    { __typename?: 'PersonalMessage' }
    & Pick<PersonalMessage, 'id' | 'title' | 'text' | 'dateAvailable'>
    & { media: Array<(
      { __typename?: 'MediaPersonalMessage' }
      & Pick<MediaPersonalMessage, 'id' | 'text' | 'title' | 'urlFile' | 'mediaType' | 'objectSize'>
    )> }
  ) }
);

export type PersonalMessage_DemoQueryVariables = Exact<{
  id: Scalars['String'];
  paginaId: Scalars['String'];
}>;


export type PersonalMessage_DemoQuery = (
  { __typename?: 'Query' }
  & { personalmessage_demo: (
    { __typename?: 'PersonalMessage' }
    & Pick<PersonalMessage, 'id' | 'title' | 'text' | 'dateAvailable'>
    & { media: Array<(
      { __typename?: 'MediaPersonalMessage' }
      & Pick<MediaPersonalMessage, 'id' | 'text' | 'title' | 'urlFile' | 'mediaType' | 'objectSize'>
    )> }
  ) }
);

export type PersonalMessages_DemoQueryVariables = Exact<{
  paginaId: Scalars['String'];
}>;


export type PersonalMessages_DemoQuery = (
  { __typename?: 'Query' }
  & { personalmessages_demo?: Maybe<Array<(
    { __typename?: 'PersonalMessage' }
    & Pick<PersonalMessage, 'id' | 'title' | 'text' | 'dateAvailable' | 'updatedAt' | 'createdAt'>
    & { media: Array<(
      { __typename?: 'MediaPersonalMessage' }
      & Pick<MediaPersonalMessage, 'urlFile' | 'mediaType' | 'id' | 'creatorId'>
    )> }
  )>> }
);

export type RequestsByPaginaIdQueryVariables = Exact<{
  paginaId: Scalars['String'];
}>;


export type RequestsByPaginaIdQuery = (
  { __typename?: 'Query' }
  & { requestsByPaginaId: Array<(
    { __typename?: 'AccessRequest' }
    & Pick<AccessRequest, 'id' | 'requestorId' | 'paginaId' | 'requesttext' | 'status'>
    & { requestor: (
      { __typename?: 'User' }
      & Pick<User, 'username' | 'email' | 'id'>
    ) }
  )> }
);

export type RequestsByPaginaId_DemoQueryVariables = Exact<{
  paginaId: Scalars['String'];
}>;


export type RequestsByPaginaId_DemoQuery = (
  { __typename?: 'Query' }
  & { requestsByPaginaId_demo: Array<(
    { __typename?: 'AccessRequest' }
    & Pick<AccessRequest, 'id' | 'requestorId' | 'paginaId' | 'requesttext' | 'status'>
    & { requestor: (
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id'>
    ) }
  )> }
);

export type AllPartnersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllPartnersQuery = (
  { __typename?: 'Query' }
  & { allPartners: Array<(
    { __typename?: 'PartnerResponse' }
    & Pick<PartnerResponse, 'id' | 'userId' | 'username' | 'email' | 'vat_number'>
  )> }
);

export const IndexPageHerdenkingsPaginaFragmentDoc = gql`
    fragment IndexPageHerdenkingsPagina on HerdenkingsPagina {
  id
  mediaUrl
  name_of_page
  text
  DoB
  DoD
  condoleance_active
  shareable
  accessible
  control_before
  number_of_people
  Payment_plan
  DesignType
}
    `;
export const MemorySnippetFragmentDoc = gql`
    fragment MemorySnippet on Herinnering {
  id
  title
  text
  categorie
  creator {
    id
    username
  }
  media {
    text
    title
    urlFile
  }
  comments {
    id
    comment
  }
}
    `;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on LoginResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
  accessToken
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const Invite_PeopleDocument = gql`
    mutation Invite_people($email: String!, $username: String!, $public_token: String!) {
  Invite_people(email: $email, username: $username, public_token: $public_token)
}
    `;
export type Invite_PeopleMutationFn = Apollo.MutationFunction<Invite_PeopleMutation, Invite_PeopleMutationVariables>;

/**
 * __useInvite_PeopleMutation__
 *
 * To run a mutation, you first call `useInvite_PeopleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInvite_PeopleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [invitePeopleMutation, { data, loading, error }] = useInvite_PeopleMutation({
 *   variables: {
 *      email: // value for 'email'
 *      username: // value for 'username'
 *      public_token: // value for 'public_token'
 *   },
 * });
 */
export function useInvite_PeopleMutation(baseOptions?: Apollo.MutationHookOptions<Invite_PeopleMutation, Invite_PeopleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Invite_PeopleMutation, Invite_PeopleMutationVariables>(Invite_PeopleDocument, options);
      }
export type Invite_PeopleMutationHookResult = ReturnType<typeof useInvite_PeopleMutation>;
export type Invite_PeopleMutationResult = Apollo.MutationResult<Invite_PeopleMutation>;
export type Invite_PeopleMutationOptions = Apollo.BaseMutationOptions<Invite_PeopleMutation, Invite_PeopleMutationVariables>;
export const AddMediaUrlDocument = gql`
    mutation AddMediaUrl($paginaId: String!, $mediaUrl: String!) {
  addMediaUrl(paginaId: $paginaId, mediaUrl: $mediaUrl) {
    id
    mediaUrl
  }
}
    `;
export type AddMediaUrlMutationFn = Apollo.MutationFunction<AddMediaUrlMutation, AddMediaUrlMutationVariables>;

/**
 * __useAddMediaUrlMutation__
 *
 * To run a mutation, you first call `useAddMediaUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMediaUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMediaUrlMutation, { data, loading, error }] = useAddMediaUrlMutation({
 *   variables: {
 *      paginaId: // value for 'paginaId'
 *      mediaUrl: // value for 'mediaUrl'
 *   },
 * });
 */
export function useAddMediaUrlMutation(baseOptions?: Apollo.MutationHookOptions<AddMediaUrlMutation, AddMediaUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddMediaUrlMutation, AddMediaUrlMutationVariables>(AddMediaUrlDocument, options);
      }
export type AddMediaUrlMutationHookResult = ReturnType<typeof useAddMediaUrlMutation>;
export type AddMediaUrlMutationResult = Apollo.MutationResult<AddMediaUrlMutation>;
export type AddMediaUrlMutationOptions = Apollo.BaseMutationOptions<AddMediaUrlMutation, AddMediaUrlMutationVariables>;
export const CancelMollieSubscriptionDocument = gql`
    mutation CancelMollieSubscription($public_token: String!, $MollieSubscriptionId: String!) {
  cancelMollieSubscription(
    public_token: $public_token
    MollieSubscriptionId: $MollieSubscriptionId
  )
}
    `;
export type CancelMollieSubscriptionMutationFn = Apollo.MutationFunction<CancelMollieSubscriptionMutation, CancelMollieSubscriptionMutationVariables>;

/**
 * __useCancelMollieSubscriptionMutation__
 *
 * To run a mutation, you first call `useCancelMollieSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelMollieSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelMollieSubscriptionMutation, { data, loading, error }] = useCancelMollieSubscriptionMutation({
 *   variables: {
 *      public_token: // value for 'public_token'
 *      MollieSubscriptionId: // value for 'MollieSubscriptionId'
 *   },
 * });
 */
export function useCancelMollieSubscriptionMutation(baseOptions?: Apollo.MutationHookOptions<CancelMollieSubscriptionMutation, CancelMollieSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelMollieSubscriptionMutation, CancelMollieSubscriptionMutationVariables>(CancelMollieSubscriptionDocument, options);
      }
export type CancelMollieSubscriptionMutationHookResult = ReturnType<typeof useCancelMollieSubscriptionMutation>;
export type CancelMollieSubscriptionMutationResult = Apollo.MutationResult<CancelMollieSubscriptionMutation>;
export type CancelMollieSubscriptionMutationOptions = Apollo.BaseMutationOptions<CancelMollieSubscriptionMutation, CancelMollieSubscriptionMutationVariables>;
export const ChangeMemoryOnTimelineStateDocument = gql`
    mutation ChangeMemoryOnTimelineState($id: String!, $status: Boolean!, $paginaId: String!) {
  changeMemoryOnTimelineState(id: $id, status: $status, paginaId: $paginaId) {
    id
    status
    on_timeline
  }
}
    `;
export type ChangeMemoryOnTimelineStateMutationFn = Apollo.MutationFunction<ChangeMemoryOnTimelineStateMutation, ChangeMemoryOnTimelineStateMutationVariables>;

/**
 * __useChangeMemoryOnTimelineStateMutation__
 *
 * To run a mutation, you first call `useChangeMemoryOnTimelineStateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeMemoryOnTimelineStateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeMemoryOnTimelineStateMutation, { data, loading, error }] = useChangeMemoryOnTimelineStateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      status: // value for 'status'
 *      paginaId: // value for 'paginaId'
 *   },
 * });
 */
export function useChangeMemoryOnTimelineStateMutation(baseOptions?: Apollo.MutationHookOptions<ChangeMemoryOnTimelineStateMutation, ChangeMemoryOnTimelineStateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeMemoryOnTimelineStateMutation, ChangeMemoryOnTimelineStateMutationVariables>(ChangeMemoryOnTimelineStateDocument, options);
      }
export type ChangeMemoryOnTimelineStateMutationHookResult = ReturnType<typeof useChangeMemoryOnTimelineStateMutation>;
export type ChangeMemoryOnTimelineStateMutationResult = Apollo.MutationResult<ChangeMemoryOnTimelineStateMutation>;
export type ChangeMemoryOnTimelineStateMutationOptions = Apollo.BaseMutationOptions<ChangeMemoryOnTimelineStateMutation, ChangeMemoryOnTimelineStateMutationVariables>;
export const ChangeMemorsdqfyStatusDocument = gql`
    mutation ChangeMemorsdqfyStatus($id: String!, $status: Float!, $paginaId: String!) {
  changeMemoryStatus(id: $id, status: $status, paginaId: $paginaId) {
    id
    status
    on_timeline
  }
}
    `;
export type ChangeMemorsdqfyStatusMutationFn = Apollo.MutationFunction<ChangeMemorsdqfyStatusMutation, ChangeMemorsdqfyStatusMutationVariables>;

/**
 * __useChangeMemorsdqfyStatusMutation__
 *
 * To run a mutation, you first call `useChangeMemorsdqfyStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeMemorsdqfyStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeMemorsdqfyStatusMutation, { data, loading, error }] = useChangeMemorsdqfyStatusMutation({
 *   variables: {
 *      id: // value for 'id'
 *      status: // value for 'status'
 *      paginaId: // value for 'paginaId'
 *   },
 * });
 */
export function useChangeMemorsdqfyStatusMutation(baseOptions?: Apollo.MutationHookOptions<ChangeMemorsdqfyStatusMutation, ChangeMemorsdqfyStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeMemorsdqfyStatusMutation, ChangeMemorsdqfyStatusMutationVariables>(ChangeMemorsdqfyStatusDocument, options);
      }
export type ChangeMemorsdqfyStatusMutationHookResult = ReturnType<typeof useChangeMemorsdqfyStatusMutation>;
export type ChangeMemorsdqfyStatusMutationResult = Apollo.MutationResult<ChangeMemorsdqfyStatusMutation>;
export type ChangeMemorsdqfyStatusMutationOptions = Apollo.BaseMutationOptions<ChangeMemorsdqfyStatusMutation, ChangeMemorsdqfyStatusMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword)
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ChangeStatusAccessRequestDocument = gql`
    mutation ChangeStatusAccessRequest($paginaId: String!, $id: String!, $status: Float!) {
  changeStatusAccessRequest(paginaId: $paginaId, id: $id, status: $status) {
    id
    status
    requestorId
  }
}
    `;
export type ChangeStatusAccessRequestMutationFn = Apollo.MutationFunction<ChangeStatusAccessRequestMutation, ChangeStatusAccessRequestMutationVariables>;

/**
 * __useChangeStatusAccessRequestMutation__
 *
 * To run a mutation, you first call `useChangeStatusAccessRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeStatusAccessRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeStatusAccessRequestMutation, { data, loading, error }] = useChangeStatusAccessRequestMutation({
 *   variables: {
 *      paginaId: // value for 'paginaId'
 *      id: // value for 'id'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useChangeStatusAccessRequestMutation(baseOptions?: Apollo.MutationHookOptions<ChangeStatusAccessRequestMutation, ChangeStatusAccessRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeStatusAccessRequestMutation, ChangeStatusAccessRequestMutationVariables>(ChangeStatusAccessRequestDocument, options);
      }
export type ChangeStatusAccessRequestMutationHookResult = ReturnType<typeof useChangeStatusAccessRequestMutation>;
export type ChangeStatusAccessRequestMutationResult = Apollo.MutationResult<ChangeStatusAccessRequestMutation>;
export type ChangeStatusAccessRequestMutationOptions = Apollo.BaseMutationOptions<ChangeStatusAccessRequestMutation, ChangeStatusAccessRequestMutationVariables>;
export const CreateAccesRequestDocument = gql`
    mutation CreateAccesRequest($paginaId: String!, $requestor_username: String!, $requesttext: String!) {
  createAccessRequest(
    paginaId: $paginaId
    requestor_username: $requestor_username
    requesttext: $requesttext
  ) {
    id
    requestorId
    paginaId
    requesttext
  }
}
    `;
export type CreateAccesRequestMutationFn = Apollo.MutationFunction<CreateAccesRequestMutation, CreateAccesRequestMutationVariables>;

/**
 * __useCreateAccesRequestMutation__
 *
 * To run a mutation, you first call `useCreateAccesRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccesRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccesRequestMutation, { data, loading, error }] = useCreateAccesRequestMutation({
 *   variables: {
 *      paginaId: // value for 'paginaId'
 *      requestor_username: // value for 'requestor_username'
 *      requesttext: // value for 'requesttext'
 *   },
 * });
 */
export function useCreateAccesRequestMutation(baseOptions?: Apollo.MutationHookOptions<CreateAccesRequestMutation, CreateAccesRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAccesRequestMutation, CreateAccesRequestMutationVariables>(CreateAccesRequestDocument, options);
      }
export type CreateAccesRequestMutationHookResult = ReturnType<typeof useCreateAccesRequestMutation>;
export type CreateAccesRequestMutationResult = Apollo.MutationResult<CreateAccesRequestMutation>;
export type CreateAccesRequestMutationOptions = Apollo.BaseMutationOptions<CreateAccesRequestMutation, CreateAccesRequestMutationVariables>;
export const CreateCommentHerinneringDocument = gql`
    mutation CreateCommentHerinnering($herinneringId: String!, $comment: String!, $paginaId: String!) {
  createCommentHerinnering(
    herinneringId: $herinneringId
    comment: $comment
    paginaId: $paginaId
  ) {
    id
    comment
    creator {
      username
    }
  }
}
    `;
export type CreateCommentHerinneringMutationFn = Apollo.MutationFunction<CreateCommentHerinneringMutation, CreateCommentHerinneringMutationVariables>;

/**
 * __useCreateCommentHerinneringMutation__
 *
 * To run a mutation, you first call `useCreateCommentHerinneringMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentHerinneringMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentHerinneringMutation, { data, loading, error }] = useCreateCommentHerinneringMutation({
 *   variables: {
 *      herinneringId: // value for 'herinneringId'
 *      comment: // value for 'comment'
 *      paginaId: // value for 'paginaId'
 *   },
 * });
 */
export function useCreateCommentHerinneringMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentHerinneringMutation, CreateCommentHerinneringMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentHerinneringMutation, CreateCommentHerinneringMutationVariables>(CreateCommentHerinneringDocument, options);
      }
export type CreateCommentHerinneringMutationHookResult = ReturnType<typeof useCreateCommentHerinneringMutation>;
export type CreateCommentHerinneringMutationResult = Apollo.MutationResult<CreateCommentHerinneringMutation>;
export type CreateCommentHerinneringMutationOptions = Apollo.BaseMutationOptions<CreateCommentHerinneringMutation, CreateCommentHerinneringMutationVariables>;
export const CreateCondolatieDocument = gql`
    mutation CreateCondolatie($paginaId: String!, $input: CondolatieInput!) {
  createCondolatie(paginaId: $paginaId, input: $input) {
    id
    text
    createdAt
    updatedAt
    textSnippet
    creator {
      id
      username
    }
  }
}
    `;
export type CreateCondolatieMutationFn = Apollo.MutationFunction<CreateCondolatieMutation, CreateCondolatieMutationVariables>;

/**
 * __useCreateCondolatieMutation__
 *
 * To run a mutation, you first call `useCreateCondolatieMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCondolatieMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCondolatieMutation, { data, loading, error }] = useCreateCondolatieMutation({
 *   variables: {
 *      paginaId: // value for 'paginaId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCondolatieMutation(baseOptions?: Apollo.MutationHookOptions<CreateCondolatieMutation, CreateCondolatieMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCondolatieMutation, CreateCondolatieMutationVariables>(CreateCondolatieDocument, options);
      }
export type CreateCondolatieMutationHookResult = ReturnType<typeof useCreateCondolatieMutation>;
export type CreateCondolatieMutationResult = Apollo.MutationResult<CreateCondolatieMutation>;
export type CreateCondolatieMutationOptions = Apollo.BaseMutationOptions<CreateCondolatieMutation, CreateCondolatieMutationVariables>;
export const CreateHerdenkingspaginaDocument = gql`
    mutation CreateHerdenkingspagina($input: HerdenkingsPaginaInput!, $DoD: DateTime) {
  createHerdenkingspagina(input: $input, DoD: $DoD) {
    errors {
      field
      message
    }
    accessToken
    herdenkingspagina {
      id
      name_of_page
      owner {
        id
      }
    }
  }
}
    `;
export type CreateHerdenkingspaginaMutationFn = Apollo.MutationFunction<CreateHerdenkingspaginaMutation, CreateHerdenkingspaginaMutationVariables>;

/**
 * __useCreateHerdenkingspaginaMutation__
 *
 * To run a mutation, you first call `useCreateHerdenkingspaginaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateHerdenkingspaginaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createHerdenkingspaginaMutation, { data, loading, error }] = useCreateHerdenkingspaginaMutation({
 *   variables: {
 *      input: // value for 'input'
 *      DoD: // value for 'DoD'
 *   },
 * });
 */
export function useCreateHerdenkingspaginaMutation(baseOptions?: Apollo.MutationHookOptions<CreateHerdenkingspaginaMutation, CreateHerdenkingspaginaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateHerdenkingspaginaMutation, CreateHerdenkingspaginaMutationVariables>(CreateHerdenkingspaginaDocument, options);
      }
export type CreateHerdenkingspaginaMutationHookResult = ReturnType<typeof useCreateHerdenkingspaginaMutation>;
export type CreateHerdenkingspaginaMutationResult = Apollo.MutationResult<CreateHerdenkingspaginaMutation>;
export type CreateHerdenkingspaginaMutationOptions = Apollo.BaseMutationOptions<CreateHerdenkingspaginaMutation, CreateHerdenkingspaginaMutationVariables>;
export const CreateHerinneringDocument = gql`
    mutation CreateHerinnering($paginaId: String!, $input: HerinneringInput!, $status: Float) {
  createHerinnering(input: $input, paginaId: $paginaId, status: $status) {
    id
    title
    text
    categorie
    datumVanHerinnering
  }
}
    `;
export type CreateHerinneringMutationFn = Apollo.MutationFunction<CreateHerinneringMutation, CreateHerinneringMutationVariables>;

/**
 * __useCreateHerinneringMutation__
 *
 * To run a mutation, you first call `useCreateHerinneringMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateHerinneringMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createHerinneringMutation, { data, loading, error }] = useCreateHerinneringMutation({
 *   variables: {
 *      paginaId: // value for 'paginaId'
 *      input: // value for 'input'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useCreateHerinneringMutation(baseOptions?: Apollo.MutationHookOptions<CreateHerinneringMutation, CreateHerinneringMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateHerinneringMutation, CreateHerinneringMutationVariables>(CreateHerinneringDocument, options);
      }
export type CreateHerinneringMutationHookResult = ReturnType<typeof useCreateHerinneringMutation>;
export type CreateHerinneringMutationResult = Apollo.MutationResult<CreateHerinneringMutation>;
export type CreateHerinneringMutationOptions = Apollo.BaseMutationOptions<CreateHerinneringMutation, CreateHerinneringMutationVariables>;
export const CreateLevenstijdlijnBetalingDocument = gql`
    mutation createLevenstijdlijnBetaling($public_token: String!, $payment_term: Float!, $payment_plan: Float!) {
  createLevenstijdlijnBetaling(
    public_token: $public_token
    payment_plan: $payment_plan
    payment_term: $payment_term
  ) {
    pay_id
    pay_link
  }
}
    `;
export type CreateLevenstijdlijnBetalingMutationFn = Apollo.MutationFunction<CreateLevenstijdlijnBetalingMutation, CreateLevenstijdlijnBetalingMutationVariables>;

/**
 * __useCreateLevenstijdlijnBetalingMutation__
 *
 * To run a mutation, you first call `useCreateLevenstijdlijnBetalingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLevenstijdlijnBetalingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLevenstijdlijnBetalingMutation, { data, loading, error }] = useCreateLevenstijdlijnBetalingMutation({
 *   variables: {
 *      public_token: // value for 'public_token'
 *      payment_term: // value for 'payment_term'
 *      payment_plan: // value for 'payment_plan'
 *   },
 * });
 */
export function useCreateLevenstijdlijnBetalingMutation(baseOptions?: Apollo.MutationHookOptions<CreateLevenstijdlijnBetalingMutation, CreateLevenstijdlijnBetalingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLevenstijdlijnBetalingMutation, CreateLevenstijdlijnBetalingMutationVariables>(CreateLevenstijdlijnBetalingDocument, options);
      }
export type CreateLevenstijdlijnBetalingMutationHookResult = ReturnType<typeof useCreateLevenstijdlijnBetalingMutation>;
export type CreateLevenstijdlijnBetalingMutationResult = Apollo.MutationResult<CreateLevenstijdlijnBetalingMutation>;
export type CreateLevenstijdlijnBetalingMutationOptions = Apollo.BaseMutationOptions<CreateLevenstijdlijnBetalingMutation, CreateLevenstijdlijnBetalingMutationVariables>;
export const CreateLevenstijdlijnDomicilieringDocument = gql`
    mutation CreateLevenstijdlijnDomiciliering($public_token: String!, $payment_term: Float!, $payment_plan: Float!) {
  createLevenstijdlijnDomiciliering(
    public_token: $public_token
    payment_plan: $payment_plan
    payment_term: $payment_term
  ) {
    pay_id
    pay_link
  }
}
    `;
export type CreateLevenstijdlijnDomicilieringMutationFn = Apollo.MutationFunction<CreateLevenstijdlijnDomicilieringMutation, CreateLevenstijdlijnDomicilieringMutationVariables>;

/**
 * __useCreateLevenstijdlijnDomicilieringMutation__
 *
 * To run a mutation, you first call `useCreateLevenstijdlijnDomicilieringMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLevenstijdlijnDomicilieringMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLevenstijdlijnDomicilieringMutation, { data, loading, error }] = useCreateLevenstijdlijnDomicilieringMutation({
 *   variables: {
 *      public_token: // value for 'public_token'
 *      payment_term: // value for 'payment_term'
 *      payment_plan: // value for 'payment_plan'
 *   },
 * });
 */
export function useCreateLevenstijdlijnDomicilieringMutation(baseOptions?: Apollo.MutationHookOptions<CreateLevenstijdlijnDomicilieringMutation, CreateLevenstijdlijnDomicilieringMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLevenstijdlijnDomicilieringMutation, CreateLevenstijdlijnDomicilieringMutationVariables>(CreateLevenstijdlijnDomicilieringDocument, options);
      }
export type CreateLevenstijdlijnDomicilieringMutationHookResult = ReturnType<typeof useCreateLevenstijdlijnDomicilieringMutation>;
export type CreateLevenstijdlijnDomicilieringMutationResult = Apollo.MutationResult<CreateLevenstijdlijnDomicilieringMutation>;
export type CreateLevenstijdlijnDomicilieringMutationOptions = Apollo.BaseMutationOptions<CreateLevenstijdlijnDomicilieringMutation, CreateLevenstijdlijnDomicilieringMutationVariables>;
export const CreateMediaCondolatieDocument = gql`
    mutation CreateMediaCondolatie($condolatieId: String!, $input: MediaInput!, $paginaId: String!) {
  createMediaCondolatie(
    condolatieId: $condolatieId
    input: $input
    paginaId: $paginaId
  ) {
    id
    title
    urlFile
    creator {
      id
      username
    }
  }
}
    `;
export type CreateMediaCondolatieMutationFn = Apollo.MutationFunction<CreateMediaCondolatieMutation, CreateMediaCondolatieMutationVariables>;

/**
 * __useCreateMediaCondolatieMutation__
 *
 * To run a mutation, you first call `useCreateMediaCondolatieMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMediaCondolatieMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMediaCondolatieMutation, { data, loading, error }] = useCreateMediaCondolatieMutation({
 *   variables: {
 *      condolatieId: // value for 'condolatieId'
 *      input: // value for 'input'
 *      paginaId: // value for 'paginaId'
 *   },
 * });
 */
export function useCreateMediaCondolatieMutation(baseOptions?: Apollo.MutationHookOptions<CreateMediaCondolatieMutation, CreateMediaCondolatieMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMediaCondolatieMutation, CreateMediaCondolatieMutationVariables>(CreateMediaCondolatieDocument, options);
      }
export type CreateMediaCondolatieMutationHookResult = ReturnType<typeof useCreateMediaCondolatieMutation>;
export type CreateMediaCondolatieMutationResult = Apollo.MutationResult<CreateMediaCondolatieMutation>;
export type CreateMediaCondolatieMutationOptions = Apollo.BaseMutationOptions<CreateMediaCondolatieMutation, CreateMediaCondolatieMutationVariables>;
export const CreateMediaHerinneringDocument = gql`
    mutation CreateMediaHerinnering($input: MediaInput!, $herinneringId: String!, $paginaId: String!) {
  createMediaHerinnering(
    input: $input
    herinneringId: $herinneringId
    paginaId: $paginaId
  ) {
    id
    text
    creatorId
    urlFile
    creator {
      id
      username
    }
  }
}
    `;
export type CreateMediaHerinneringMutationFn = Apollo.MutationFunction<CreateMediaHerinneringMutation, CreateMediaHerinneringMutationVariables>;

/**
 * __useCreateMediaHerinneringMutation__
 *
 * To run a mutation, you first call `useCreateMediaHerinneringMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMediaHerinneringMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMediaHerinneringMutation, { data, loading, error }] = useCreateMediaHerinneringMutation({
 *   variables: {
 *      input: // value for 'input'
 *      herinneringId: // value for 'herinneringId'
 *      paginaId: // value for 'paginaId'
 *   },
 * });
 */
export function useCreateMediaHerinneringMutation(baseOptions?: Apollo.MutationHookOptions<CreateMediaHerinneringMutation, CreateMediaHerinneringMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMediaHerinneringMutation, CreateMediaHerinneringMutationVariables>(CreateMediaHerinneringDocument, options);
      }
export type CreateMediaHerinneringMutationHookResult = ReturnType<typeof useCreateMediaHerinneringMutation>;
export type CreateMediaHerinneringMutationResult = Apollo.MutationResult<CreateMediaHerinneringMutation>;
export type CreateMediaHerinneringMutationOptions = Apollo.BaseMutationOptions<CreateMediaHerinneringMutation, CreateMediaHerinneringMutationVariables>;
export const CreateMediaMessageDocument = gql`
    mutation CreateMediaMessage($input: MediaInput!, $messageId: String!, $paginaId: String!) {
  createMediaMessage(input: $input, messageId: $messageId, paginaId: $paginaId) {
    id
    text
    creatorId
    urlFile
    creator {
      id
      username
    }
  }
}
    `;
export type CreateMediaMessageMutationFn = Apollo.MutationFunction<CreateMediaMessageMutation, CreateMediaMessageMutationVariables>;

/**
 * __useCreateMediaMessageMutation__
 *
 * To run a mutation, you first call `useCreateMediaMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMediaMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMediaMessageMutation, { data, loading, error }] = useCreateMediaMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *      messageId: // value for 'messageId'
 *      paginaId: // value for 'paginaId'
 *   },
 * });
 */
export function useCreateMediaMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateMediaMessageMutation, CreateMediaMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMediaMessageMutation, CreateMediaMessageMutationVariables>(CreateMediaMessageDocument, options);
      }
export type CreateMediaMessageMutationHookResult = ReturnType<typeof useCreateMediaMessageMutation>;
export type CreateMediaMessageMutationResult = Apollo.MutationResult<CreateMediaMessageMutation>;
export type CreateMediaMessageMutationOptions = Apollo.BaseMutationOptions<CreateMediaMessageMutation, CreateMediaMessageMutationVariables>;
export const CreateMediaPersonalMessageDocument = gql`
    mutation CreateMediaPersonalMessage($input: MediaInput!, $pmessageId: String!, $paginaId: String!) {
  createMediaPersonalMessage(
    input: $input
    pmessageId: $pmessageId
    paginaId: $paginaId
  ) {
    id
    text
    creatorId
    urlFile
    creator {
      id
      username
    }
  }
}
    `;
export type CreateMediaPersonalMessageMutationFn = Apollo.MutationFunction<CreateMediaPersonalMessageMutation, CreateMediaPersonalMessageMutationVariables>;

/**
 * __useCreateMediaPersonalMessageMutation__
 *
 * To run a mutation, you first call `useCreateMediaPersonalMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMediaPersonalMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMediaPersonalMessageMutation, { data, loading, error }] = useCreateMediaPersonalMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *      pmessageId: // value for 'pmessageId'
 *      paginaId: // value for 'paginaId'
 *   },
 * });
 */
export function useCreateMediaPersonalMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateMediaPersonalMessageMutation, CreateMediaPersonalMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMediaPersonalMessageMutation, CreateMediaPersonalMessageMutationVariables>(CreateMediaPersonalMessageDocument, options);
      }
export type CreateMediaPersonalMessageMutationHookResult = ReturnType<typeof useCreateMediaPersonalMessageMutation>;
export type CreateMediaPersonalMessageMutationResult = Apollo.MutationResult<CreateMediaPersonalMessageMutation>;
export type CreateMediaPersonalMessageMutationOptions = Apollo.BaseMutationOptions<CreateMediaPersonalMessageMutation, CreateMediaPersonalMessageMutationVariables>;
export const CreateMessageDocument = gql`
    mutation CreateMessage($paginaId: String!, $input: MessageInput!) {
  createMessage(input: $input, paginaId: $paginaId) {
    id
    text
    status
  }
}
    `;
export type CreateMessageMutationFn = Apollo.MutationFunction<CreateMessageMutation, CreateMessageMutationVariables>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      paginaId: // value for 'paginaId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument, options);
      }
export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = Apollo.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = Apollo.BaseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>;
export const CreatePartnerHerdenkingspaginaDocument = gql`
    mutation CreatePartnerHerdenkingspagina($input: HerdenkingsPaginaInput!, $partner_name: String!, $partner_email: String!, $partner_type: Float!, $DoD: DateTime, $info_administrator: UsernamePasswordInput) {
  createPartnerHerdenkingspagina(
    input: $input
    partner_name: $partner_name
    partner_email: $partner_email
    partner_type: $partner_type
    DoD: $DoD
    info_administrator: $info_administrator
  ) {
    errors {
      field
      message
    }
    accessToken
    herdenkingspagina {
      id
      name_of_page
      owner {
        id
      }
    }
  }
}
    `;
export type CreatePartnerHerdenkingspaginaMutationFn = Apollo.MutationFunction<CreatePartnerHerdenkingspaginaMutation, CreatePartnerHerdenkingspaginaMutationVariables>;

/**
 * __useCreatePartnerHerdenkingspaginaMutation__
 *
 * To run a mutation, you first call `useCreatePartnerHerdenkingspaginaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePartnerHerdenkingspaginaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPartnerHerdenkingspaginaMutation, { data, loading, error }] = useCreatePartnerHerdenkingspaginaMutation({
 *   variables: {
 *      input: // value for 'input'
 *      partner_name: // value for 'partner_name'
 *      partner_email: // value for 'partner_email'
 *      partner_type: // value for 'partner_type'
 *      DoD: // value for 'DoD'
 *      info_administrator: // value for 'info_administrator'
 *   },
 * });
 */
export function useCreatePartnerHerdenkingspaginaMutation(baseOptions?: Apollo.MutationHookOptions<CreatePartnerHerdenkingspaginaMutation, CreatePartnerHerdenkingspaginaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePartnerHerdenkingspaginaMutation, CreatePartnerHerdenkingspaginaMutationVariables>(CreatePartnerHerdenkingspaginaDocument, options);
      }
export type CreatePartnerHerdenkingspaginaMutationHookResult = ReturnType<typeof useCreatePartnerHerdenkingspaginaMutation>;
export type CreatePartnerHerdenkingspaginaMutationResult = Apollo.MutationResult<CreatePartnerHerdenkingspaginaMutation>;
export type CreatePartnerHerdenkingspaginaMutationOptions = Apollo.BaseMutationOptions<CreatePartnerHerdenkingspaginaMutation, CreatePartnerHerdenkingspaginaMutationVariables>;
export const CreatePersonalMessageDocument = gql`
    mutation CreatePersonalMessage($input: PersonalMessageInput!, $paginaId: String!) {
  createPersonalMessage(input: $input, paginaId: $paginaId) {
    id
    title
    paginaId
  }
}
    `;
export type CreatePersonalMessageMutationFn = Apollo.MutationFunction<CreatePersonalMessageMutation, CreatePersonalMessageMutationVariables>;

/**
 * __useCreatePersonalMessageMutation__
 *
 * To run a mutation, you first call `useCreatePersonalMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePersonalMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPersonalMessageMutation, { data, loading, error }] = useCreatePersonalMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *      paginaId: // value for 'paginaId'
 *   },
 * });
 */
export function useCreatePersonalMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreatePersonalMessageMutation, CreatePersonalMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePersonalMessageMutation, CreatePersonalMessageMutationVariables>(CreatePersonalMessageDocument, options);
      }
export type CreatePersonalMessageMutationHookResult = ReturnType<typeof useCreatePersonalMessageMutation>;
export type CreatePersonalMessageMutationResult = Apollo.MutationResult<CreatePersonalMessageMutation>;
export type CreatePersonalMessageMutationOptions = Apollo.BaseMutationOptions<CreatePersonalMessageMutation, CreatePersonalMessageMutationVariables>;
export const CreatePersonalMessageAccessDocument = gql`
    mutation CreatePersonalMessageAccess($userId: String!, $personalMessageId: String!, $paginaId: String!) {
  createPersonalMessageAccess(
    personalMessageId: $personalMessageId
    userId: $userId
    paginaId: $paginaId
  ) {
    errors {
      field
      message
    }
    pma {
      id
    }
  }
}
    `;
export type CreatePersonalMessageAccessMutationFn = Apollo.MutationFunction<CreatePersonalMessageAccessMutation, CreatePersonalMessageAccessMutationVariables>;

/**
 * __useCreatePersonalMessageAccessMutation__
 *
 * To run a mutation, you first call `useCreatePersonalMessageAccessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePersonalMessageAccessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPersonalMessageAccessMutation, { data, loading, error }] = useCreatePersonalMessageAccessMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      personalMessageId: // value for 'personalMessageId'
 *      paginaId: // value for 'paginaId'
 *   },
 * });
 */
export function useCreatePersonalMessageAccessMutation(baseOptions?: Apollo.MutationHookOptions<CreatePersonalMessageAccessMutation, CreatePersonalMessageAccessMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePersonalMessageAccessMutation, CreatePersonalMessageAccessMutationVariables>(CreatePersonalMessageAccessDocument, options);
      }
export type CreatePersonalMessageAccessMutationHookResult = ReturnType<typeof useCreatePersonalMessageAccessMutation>;
export type CreatePersonalMessageAccessMutationResult = Apollo.MutationResult<CreatePersonalMessageAccessMutation>;
export type CreatePersonalMessageAccessMutationOptions = Apollo.BaseMutationOptions<CreatePersonalMessageAccessMutation, CreatePersonalMessageAccessMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation DeleteComment($paginaId: String!, $id: String!) {
  deleteComment(paginaId: $paginaId, id: $id)
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      paginaId: // value for 'paginaId'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const DeleteCondolatieDocument = gql`
    mutation DeleteCondolatie($id: String!, $paginaId: String!) {
  deleteCondolatie(id: $id, paginaId: $paginaId)
}
    `;
export type DeleteCondolatieMutationFn = Apollo.MutationFunction<DeleteCondolatieMutation, DeleteCondolatieMutationVariables>;

/**
 * __useDeleteCondolatieMutation__
 *
 * To run a mutation, you first call `useDeleteCondolatieMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCondolatieMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCondolatieMutation, { data, loading, error }] = useDeleteCondolatieMutation({
 *   variables: {
 *      id: // value for 'id'
 *      paginaId: // value for 'paginaId'
 *   },
 * });
 */
export function useDeleteCondolatieMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCondolatieMutation, DeleteCondolatieMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCondolatieMutation, DeleteCondolatieMutationVariables>(DeleteCondolatieDocument, options);
      }
export type DeleteCondolatieMutationHookResult = ReturnType<typeof useDeleteCondolatieMutation>;
export type DeleteCondolatieMutationResult = Apollo.MutationResult<DeleteCondolatieMutation>;
export type DeleteCondolatieMutationOptions = Apollo.BaseMutationOptions<DeleteCondolatieMutation, DeleteCondolatieMutationVariables>;
export const DeleteHerinneringDocument = gql`
    mutation DeleteHerinnering($id: String!, $paginaId: String!) {
  deleteHerinnering(id: $id, paginaId: $paginaId)
}
    `;
export type DeleteHerinneringMutationFn = Apollo.MutationFunction<DeleteHerinneringMutation, DeleteHerinneringMutationVariables>;

/**
 * __useDeleteHerinneringMutation__
 *
 * To run a mutation, you first call `useDeleteHerinneringMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteHerinneringMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteHerinneringMutation, { data, loading, error }] = useDeleteHerinneringMutation({
 *   variables: {
 *      id: // value for 'id'
 *      paginaId: // value for 'paginaId'
 *   },
 * });
 */
export function useDeleteHerinneringMutation(baseOptions?: Apollo.MutationHookOptions<DeleteHerinneringMutation, DeleteHerinneringMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteHerinneringMutation, DeleteHerinneringMutationVariables>(DeleteHerinneringDocument, options);
      }
export type DeleteHerinneringMutationHookResult = ReturnType<typeof useDeleteHerinneringMutation>;
export type DeleteHerinneringMutationResult = Apollo.MutationResult<DeleteHerinneringMutation>;
export type DeleteHerinneringMutationOptions = Apollo.BaseMutationOptions<DeleteHerinneringMutation, DeleteHerinneringMutationVariables>;
export const DeleteMediaDocument = gql`
    mutation DeleteMedia($id: String!, $paginaId: String!) {
  deleteMedia(id: $id, paginaId: $paginaId)
}
    `;
export type DeleteMediaMutationFn = Apollo.MutationFunction<DeleteMediaMutation, DeleteMediaMutationVariables>;

/**
 * __useDeleteMediaMutation__
 *
 * To run a mutation, you first call `useDeleteMediaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMediaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMediaMutation, { data, loading, error }] = useDeleteMediaMutation({
 *   variables: {
 *      id: // value for 'id'
 *      paginaId: // value for 'paginaId'
 *   },
 * });
 */
export function useDeleteMediaMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMediaMutation, DeleteMediaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMediaMutation, DeleteMediaMutationVariables>(DeleteMediaDocument, options);
      }
export type DeleteMediaMutationHookResult = ReturnType<typeof useDeleteMediaMutation>;
export type DeleteMediaMutationResult = Apollo.MutationResult<DeleteMediaMutation>;
export type DeleteMediaMutationOptions = Apollo.BaseMutationOptions<DeleteMediaMutation, DeleteMediaMutationVariables>;
export const DeletePersonalMessageAccessDocument = gql`
    mutation DeletePersonalMessageAccess($userThatHasAccessId: String!, $personalMessageId: String!, $paginaId: String!) {
  deletePersonalMessageAccess(
    userThatHasAccessId: $userThatHasAccessId
    personalMessageId: $personalMessageId
    paginaId: $paginaId
  )
}
    `;
export type DeletePersonalMessageAccessMutationFn = Apollo.MutationFunction<DeletePersonalMessageAccessMutation, DeletePersonalMessageAccessMutationVariables>;

/**
 * __useDeletePersonalMessageAccessMutation__
 *
 * To run a mutation, you first call `useDeletePersonalMessageAccessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePersonalMessageAccessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePersonalMessageAccessMutation, { data, loading, error }] = useDeletePersonalMessageAccessMutation({
 *   variables: {
 *      userThatHasAccessId: // value for 'userThatHasAccessId'
 *      personalMessageId: // value for 'personalMessageId'
 *      paginaId: // value for 'paginaId'
 *   },
 * });
 */
export function useDeletePersonalMessageAccessMutation(baseOptions?: Apollo.MutationHookOptions<DeletePersonalMessageAccessMutation, DeletePersonalMessageAccessMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePersonalMessageAccessMutation, DeletePersonalMessageAccessMutationVariables>(DeletePersonalMessageAccessDocument, options);
      }
export type DeletePersonalMessageAccessMutationHookResult = ReturnType<typeof useDeletePersonalMessageAccessMutation>;
export type DeletePersonalMessageAccessMutationResult = Apollo.MutationResult<DeletePersonalMessageAccessMutation>;
export type DeletePersonalMessageAccessMutationOptions = Apollo.BaseMutationOptions<DeletePersonalMessageAccessMutation, DeletePersonalMessageAccessMutationVariables>;
export const DeletePersonalMessageDocument = gql`
    mutation DeletePersonalMessage($id: String!, $paginaId: String!) {
  deletePersonalMessage(id: $id, paginaId: $paginaId)
}
    `;
export type DeletePersonalMessageMutationFn = Apollo.MutationFunction<DeletePersonalMessageMutation, DeletePersonalMessageMutationVariables>;

/**
 * __useDeletePersonalMessageMutation__
 *
 * To run a mutation, you first call `useDeletePersonalMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePersonalMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePersonalMessageMutation, { data, loading, error }] = useDeletePersonalMessageMutation({
 *   variables: {
 *      id: // value for 'id'
 *      paginaId: // value for 'paginaId'
 *   },
 * });
 */
export function useDeletePersonalMessageMutation(baseOptions?: Apollo.MutationHookOptions<DeletePersonalMessageMutation, DeletePersonalMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePersonalMessageMutation, DeletePersonalMessageMutationVariables>(DeletePersonalMessageDocument, options);
      }
export type DeletePersonalMessageMutationHookResult = ReturnType<typeof useDeletePersonalMessageMutation>;
export type DeletePersonalMessageMutationResult = Apollo.MutationResult<DeletePersonalMessageMutation>;
export type DeletePersonalMessageMutationOptions = Apollo.BaseMutationOptions<DeletePersonalMessageMutation, DeletePersonalMessageMutationVariables>;
export const Digitize_RequestDocument = gql`
    mutation Digitize_request($name: String!, $email: String!, $tel: String!, $address: String!, $boodschap: String!) {
  digitize_request(
    name: $name
    email: $email
    tel: $tel
    address: $address
    boodschap: $boodschap
  )
}
    `;
export type Digitize_RequestMutationFn = Apollo.MutationFunction<Digitize_RequestMutation, Digitize_RequestMutationVariables>;

/**
 * __useDigitize_RequestMutation__
 *
 * To run a mutation, you first call `useDigitize_RequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDigitize_RequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [digitizeRequestMutation, { data, loading, error }] = useDigitize_RequestMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      tel: // value for 'tel'
 *      address: // value for 'address'
 *      boodschap: // value for 'boodschap'
 *   },
 * });
 */
export function useDigitize_RequestMutation(baseOptions?: Apollo.MutationHookOptions<Digitize_RequestMutation, Digitize_RequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Digitize_RequestMutation, Digitize_RequestMutationVariables>(Digitize_RequestDocument, options);
      }
export type Digitize_RequestMutationHookResult = ReturnType<typeof useDigitize_RequestMutation>;
export type Digitize_RequestMutationResult = Apollo.MutationResult<Digitize_RequestMutation>;
export type Digitize_RequestMutationOptions = Apollo.BaseMutationOptions<Digitize_RequestMutation, Digitize_RequestMutationVariables>;
export const Digitize_ConfirmationDocument = gql`
    mutation digitize_confirmation($name_of_page: String!, $page_id: String!) {
  digitize_confirmation(name_of_page: $name_of_page, page_id: $page_id)
}
    `;
export type Digitize_ConfirmationMutationFn = Apollo.MutationFunction<Digitize_ConfirmationMutation, Digitize_ConfirmationMutationVariables>;

/**
 * __useDigitize_ConfirmationMutation__
 *
 * To run a mutation, you first call `useDigitize_ConfirmationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDigitize_ConfirmationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [digitizeConfirmationMutation, { data, loading, error }] = useDigitize_ConfirmationMutation({
 *   variables: {
 *      name_of_page: // value for 'name_of_page'
 *      page_id: // value for 'page_id'
 *   },
 * });
 */
export function useDigitize_ConfirmationMutation(baseOptions?: Apollo.MutationHookOptions<Digitize_ConfirmationMutation, Digitize_ConfirmationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Digitize_ConfirmationMutation, Digitize_ConfirmationMutationVariables>(Digitize_ConfirmationDocument, options);
      }
export type Digitize_ConfirmationMutationHookResult = ReturnType<typeof useDigitize_ConfirmationMutation>;
export type Digitize_ConfirmationMutationResult = Apollo.MutationResult<Digitize_ConfirmationMutation>;
export type Digitize_ConfirmationMutationOptions = Apollo.BaseMutationOptions<Digitize_ConfirmationMutation, Digitize_ConfirmationMutationVariables>;
export const Email_CollecterDocument = gql`
    mutation email_collecter($email: String!, $sheet_index: Float!) {
  email_collecter(email: $email, sheet_index: $sheet_index)
}
    `;
export type Email_CollecterMutationFn = Apollo.MutationFunction<Email_CollecterMutation, Email_CollecterMutationVariables>;

/**
 * __useEmail_CollecterMutation__
 *
 * To run a mutation, you first call `useEmail_CollecterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEmail_CollecterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [emailCollecterMutation, { data, loading, error }] = useEmail_CollecterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      sheet_index: // value for 'sheet_index'
 *   },
 * });
 */
export function useEmail_CollecterMutation(baseOptions?: Apollo.MutationHookOptions<Email_CollecterMutation, Email_CollecterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Email_CollecterMutation, Email_CollecterMutationVariables>(Email_CollecterDocument, options);
      }
export type Email_CollecterMutationHookResult = ReturnType<typeof useEmail_CollecterMutation>;
export type Email_CollecterMutationResult = Apollo.MutationResult<Email_CollecterMutation>;
export type Email_CollecterMutationOptions = Apollo.BaseMutationOptions<Email_CollecterMutation, Email_CollecterMutationVariables>;
export const FacebookLoginDocument = gql`
    mutation FacebookLogin($accessToken: String!, $userID: String!) {
  facebookLogin(accessToken: $accessToken, userID: $userID) {
    user {
      id
    }
    errors {
      field
      message
    }
    accessToken
  }
}
    `;
export type FacebookLoginMutationFn = Apollo.MutationFunction<FacebookLoginMutation, FacebookLoginMutationVariables>;

/**
 * __useFacebookLoginMutation__
 *
 * To run a mutation, you first call `useFacebookLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFacebookLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [facebookLoginMutation, { data, loading, error }] = useFacebookLoginMutation({
 *   variables: {
 *      accessToken: // value for 'accessToken'
 *      userID: // value for 'userID'
 *   },
 * });
 */
export function useFacebookLoginMutation(baseOptions?: Apollo.MutationHookOptions<FacebookLoginMutation, FacebookLoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FacebookLoginMutation, FacebookLoginMutationVariables>(FacebookLoginDocument, options);
      }
export type FacebookLoginMutationHookResult = ReturnType<typeof useFacebookLoginMutation>;
export type FacebookLoginMutationResult = Apollo.MutationResult<FacebookLoginMutation>;
export type FacebookLoginMutationOptions = Apollo.BaseMutationOptions<FacebookLoginMutation, FacebookLoginMutationVariables>;
export const FeedbackDocument = gql`
    mutation Feedback($userId: String!, $feedback: String!) {
  feedback(userId: $userId, feedback: $feedback)
}
    `;
export type FeedbackMutationFn = Apollo.MutationFunction<FeedbackMutation, FeedbackMutationVariables>;

/**
 * __useFeedbackMutation__
 *
 * To run a mutation, you first call `useFeedbackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFeedbackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [feedbackMutation, { data, loading, error }] = useFeedbackMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      feedback: // value for 'feedback'
 *   },
 * });
 */
export function useFeedbackMutation(baseOptions?: Apollo.MutationHookOptions<FeedbackMutation, FeedbackMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FeedbackMutation, FeedbackMutationVariables>(FeedbackDocument, options);
      }
export type FeedbackMutationHookResult = ReturnType<typeof useFeedbackMutation>;
export type FeedbackMutationResult = Apollo.MutationResult<FeedbackMutation>;
export type FeedbackMutationOptions = Apollo.BaseMutationOptions<FeedbackMutation, FeedbackMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const GoogleLoginDocument = gql`
    mutation GoogleLogin($googleId: String!) {
  googleLogin(googleId: $googleId) {
    user {
      id
    }
    errors {
      field
      message
    }
    accessToken
  }
}
    `;
export type GoogleLoginMutationFn = Apollo.MutationFunction<GoogleLoginMutation, GoogleLoginMutationVariables>;

/**
 * __useGoogleLoginMutation__
 *
 * To run a mutation, you first call `useGoogleLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGoogleLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [googleLoginMutation, { data, loading, error }] = useGoogleLoginMutation({
 *   variables: {
 *      googleId: // value for 'googleId'
 *   },
 * });
 */
export function useGoogleLoginMutation(baseOptions?: Apollo.MutationHookOptions<GoogleLoginMutation, GoogleLoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GoogleLoginMutation, GoogleLoginMutationVariables>(GoogleLoginDocument, options);
      }
export type GoogleLoginMutationHookResult = ReturnType<typeof useGoogleLoginMutation>;
export type GoogleLoginMutationResult = Apollo.MutationResult<GoogleLoginMutation>;
export type GoogleLoginMutationOptions = Apollo.BaseMutationOptions<GoogleLoginMutation, GoogleLoginMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      id
    }
    errors {
      field
      message
    }
    accessToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MediaForVideoSlideshowDocument = gql`
    mutation MediaForVideoSlideshow($paginaId: String!) {
  mediaForVideoSlideshow(paginaId: $paginaId) {
    id
    urlFile
  }
}
    `;
export type MediaForVideoSlideshowMutationFn = Apollo.MutationFunction<MediaForVideoSlideshowMutation, MediaForVideoSlideshowMutationVariables>;

/**
 * __useMediaForVideoSlideshowMutation__
 *
 * To run a mutation, you first call `useMediaForVideoSlideshowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMediaForVideoSlideshowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mediaForVideoSlideshowMutation, { data, loading, error }] = useMediaForVideoSlideshowMutation({
 *   variables: {
 *      paginaId: // value for 'paginaId'
 *   },
 * });
 */
export function useMediaForVideoSlideshowMutation(baseOptions?: Apollo.MutationHookOptions<MediaForVideoSlideshowMutation, MediaForVideoSlideshowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MediaForVideoSlideshowMutation, MediaForVideoSlideshowMutationVariables>(MediaForVideoSlideshowDocument, options);
      }
export type MediaForVideoSlideshowMutationHookResult = ReturnType<typeof useMediaForVideoSlideshowMutation>;
export type MediaForVideoSlideshowMutationResult = Apollo.MutationResult<MediaForVideoSlideshowMutation>;
export type MediaForVideoSlideshowMutationOptions = Apollo.BaseMutationOptions<MediaForVideoSlideshowMutation, MediaForVideoSlideshowMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    accessToken
    user {
      id
    }
    errors {
      field
      message
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const Register_PartnerDocument = gql`
    mutation Register_Partner($options: UsernamePasswordInput!, $partner_type: Float!, $partnerdata: PartnerDataInput!) {
  register_partner(
    options: $options
    partner_type: $partner_type
    partnerdata: $partnerdata
  ) {
    accessToken
    user {
      id
    }
    errors {
      field
      message
    }
  }
}
    `;
export type Register_PartnerMutationFn = Apollo.MutationFunction<Register_PartnerMutation, Register_PartnerMutationVariables>;

/**
 * __useRegister_PartnerMutation__
 *
 * To run a mutation, you first call `useRegister_PartnerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegister_PartnerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerPartnerMutation, { data, loading, error }] = useRegister_PartnerMutation({
 *   variables: {
 *      options: // value for 'options'
 *      partner_type: // value for 'partner_type'
 *      partnerdata: // value for 'partnerdata'
 *   },
 * });
 */
export function useRegister_PartnerMutation(baseOptions?: Apollo.MutationHookOptions<Register_PartnerMutation, Register_PartnerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Register_PartnerMutation, Register_PartnerMutationVariables>(Register_PartnerDocument, options);
      }
export type Register_PartnerMutationHookResult = ReturnType<typeof useRegister_PartnerMutation>;
export type Register_PartnerMutationResult = Apollo.MutationResult<Register_PartnerMutation>;
export type Register_PartnerMutationOptions = Apollo.BaseMutationOptions<Register_PartnerMutation, Register_PartnerMutationVariables>;
export const RequestToVerifyAccountDocument = gql`
    mutation RequestToVerifyAccount($email: String!) {
  requestToVerifyAccount(email: $email)
}
    `;
export type RequestToVerifyAccountMutationFn = Apollo.MutationFunction<RequestToVerifyAccountMutation, RequestToVerifyAccountMutationVariables>;

/**
 * __useRequestToVerifyAccountMutation__
 *
 * To run a mutation, you first call `useRequestToVerifyAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestToVerifyAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestToVerifyAccountMutation, { data, loading, error }] = useRequestToVerifyAccountMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useRequestToVerifyAccountMutation(baseOptions?: Apollo.MutationHookOptions<RequestToVerifyAccountMutation, RequestToVerifyAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestToVerifyAccountMutation, RequestToVerifyAccountMutationVariables>(RequestToVerifyAccountDocument, options);
      }
export type RequestToVerifyAccountMutationHookResult = ReturnType<typeof useRequestToVerifyAccountMutation>;
export type RequestToVerifyAccountMutationResult = Apollo.MutationResult<RequestToVerifyAccountMutation>;
export type RequestToVerifyAccountMutationOptions = Apollo.BaseMutationOptions<RequestToVerifyAccountMutation, RequestToVerifyAccountMutationVariables>;
export const SubscribeDocument = gql`
    mutation Subscribe($name: String!, $email: String!, $tel: String!, $boodschap: String!) {
  subscribe(name: $name, email: $email, tel: $tel, boodschap: $boodschap)
}
    `;
export type SubscribeMutationFn = Apollo.MutationFunction<SubscribeMutation, SubscribeMutationVariables>;

/**
 * __useSubscribeMutation__
 *
 * To run a mutation, you first call `useSubscribeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubscribeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [subscribeMutation, { data, loading, error }] = useSubscribeMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      tel: // value for 'tel'
 *      boodschap: // value for 'boodschap'
 *   },
 * });
 */
export function useSubscribeMutation(baseOptions?: Apollo.MutationHookOptions<SubscribeMutation, SubscribeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubscribeMutation, SubscribeMutationVariables>(SubscribeDocument, options);
      }
export type SubscribeMutationHookResult = ReturnType<typeof useSubscribeMutation>;
export type SubscribeMutationResult = Apollo.MutationResult<SubscribeMutation>;
export type SubscribeMutationOptions = Apollo.BaseMutationOptions<SubscribeMutation, SubscribeMutationVariables>;
export const UpdateCommentDocument = gql`
    mutation UpdateComment($paginaId: String!, $id: String!, $comment: String!) {
  updateComment(paginaId: $paginaId, id: $id, comment: $comment)
}
    `;
export type UpdateCommentMutationFn = Apollo.MutationFunction<UpdateCommentMutation, UpdateCommentMutationVariables>;

/**
 * __useUpdateCommentMutation__
 *
 * To run a mutation, you first call `useUpdateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommentMutation, { data, loading, error }] = useUpdateCommentMutation({
 *   variables: {
 *      paginaId: // value for 'paginaId'
 *      id: // value for 'id'
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useUpdateCommentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCommentMutation, UpdateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCommentMutation, UpdateCommentMutationVariables>(UpdateCommentDocument, options);
      }
export type UpdateCommentMutationHookResult = ReturnType<typeof useUpdateCommentMutation>;
export type UpdateCommentMutationResult = Apollo.MutationResult<UpdateCommentMutation>;
export type UpdateCommentMutationOptions = Apollo.BaseMutationOptions<UpdateCommentMutation, UpdateCommentMutationVariables>;
export const UpdateCondolatieDocument = gql`
    mutation UpdateCondolatie($text: String!, $id: String!, $paginaId: String!) {
  updateCondolatie(text: $text, id: $id, paginaId: $paginaId) {
    id
    text
    creatorId
    createdAt
    updatedAt
    textSnippet
    creator {
      id
      username
    }
  }
}
    `;
export type UpdateCondolatieMutationFn = Apollo.MutationFunction<UpdateCondolatieMutation, UpdateCondolatieMutationVariables>;

/**
 * __useUpdateCondolatieMutation__
 *
 * To run a mutation, you first call `useUpdateCondolatieMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCondolatieMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCondolatieMutation, { data, loading, error }] = useUpdateCondolatieMutation({
 *   variables: {
 *      text: // value for 'text'
 *      id: // value for 'id'
 *      paginaId: // value for 'paginaId'
 *   },
 * });
 */
export function useUpdateCondolatieMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCondolatieMutation, UpdateCondolatieMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCondolatieMutation, UpdateCondolatieMutationVariables>(UpdateCondolatieDocument, options);
      }
export type UpdateCondolatieMutationHookResult = ReturnType<typeof useUpdateCondolatieMutation>;
export type UpdateCondolatieMutationResult = Apollo.MutationResult<UpdateCondolatieMutation>;
export type UpdateCondolatieMutationOptions = Apollo.BaseMutationOptions<UpdateCondolatieMutation, UpdateCondolatieMutationVariables>;
export const UpdateHerdenkingsPaginaDocument = gql`
    mutation UpdateHerdenkingsPagina($paginaId: String!, $name_of_page: String!, $DesignType: Float!, $mediaUrl: String!, $text: String!, $condoleance_active: Boolean!, $DoD: DateTime, $DoB: DateTime!, $control_before: Boolean!) {
  updateHerdenkingsPagina(
    paginaId: $paginaId
    name_of_page: $name_of_page
    DesignType: $DesignType
    mediaUrl: $mediaUrl
    text: $text
    condoleance_active: $condoleance_active
    DoD: $DoD
    DoB: $DoB
    control_before: $control_before
  ) {
    id
    name_of_page
    ownerId
    owner {
      username
    }
  }
}
    `;
export type UpdateHerdenkingsPaginaMutationFn = Apollo.MutationFunction<UpdateHerdenkingsPaginaMutation, UpdateHerdenkingsPaginaMutationVariables>;

/**
 * __useUpdateHerdenkingsPaginaMutation__
 *
 * To run a mutation, you first call `useUpdateHerdenkingsPaginaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateHerdenkingsPaginaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateHerdenkingsPaginaMutation, { data, loading, error }] = useUpdateHerdenkingsPaginaMutation({
 *   variables: {
 *      paginaId: // value for 'paginaId'
 *      name_of_page: // value for 'name_of_page'
 *      DesignType: // value for 'DesignType'
 *      mediaUrl: // value for 'mediaUrl'
 *      text: // value for 'text'
 *      condoleance_active: // value for 'condoleance_active'
 *      DoD: // value for 'DoD'
 *      DoB: // value for 'DoB'
 *      control_before: // value for 'control_before'
 *   },
 * });
 */
export function useUpdateHerdenkingsPaginaMutation(baseOptions?: Apollo.MutationHookOptions<UpdateHerdenkingsPaginaMutation, UpdateHerdenkingsPaginaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateHerdenkingsPaginaMutation, UpdateHerdenkingsPaginaMutationVariables>(UpdateHerdenkingsPaginaDocument, options);
      }
export type UpdateHerdenkingsPaginaMutationHookResult = ReturnType<typeof useUpdateHerdenkingsPaginaMutation>;
export type UpdateHerdenkingsPaginaMutationResult = Apollo.MutationResult<UpdateHerdenkingsPaginaMutation>;
export type UpdateHerdenkingsPaginaMutationOptions = Apollo.BaseMutationOptions<UpdateHerdenkingsPaginaMutation, UpdateHerdenkingsPaginaMutationVariables>;
export const UpdateHerinneringDocument = gql`
    mutation UpdateHerinnering($text: String, $title: String!, $categorie: Float, $datumVanHerinnering: DateTime, $id: String!, $paginaId: String!, $ontimeline: Boolean, $status: Float) {
  updateHerinnering(
    text: $text
    id: $id
    title: $title
    categorie: $categorie
    datumVanHerinnering: $datumVanHerinnering
    ontimeline: $ontimeline
    status: $status
    paginaId: $paginaId
  ) {
    id
    text
  }
}
    `;
export type UpdateHerinneringMutationFn = Apollo.MutationFunction<UpdateHerinneringMutation, UpdateHerinneringMutationVariables>;

/**
 * __useUpdateHerinneringMutation__
 *
 * To run a mutation, you first call `useUpdateHerinneringMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateHerinneringMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateHerinneringMutation, { data, loading, error }] = useUpdateHerinneringMutation({
 *   variables: {
 *      text: // value for 'text'
 *      title: // value for 'title'
 *      categorie: // value for 'categorie'
 *      datumVanHerinnering: // value for 'datumVanHerinnering'
 *      id: // value for 'id'
 *      paginaId: // value for 'paginaId'
 *      ontimeline: // value for 'ontimeline'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateHerinneringMutation(baseOptions?: Apollo.MutationHookOptions<UpdateHerinneringMutation, UpdateHerinneringMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateHerinneringMutation, UpdateHerinneringMutationVariables>(UpdateHerinneringDocument, options);
      }
export type UpdateHerinneringMutationHookResult = ReturnType<typeof useUpdateHerinneringMutation>;
export type UpdateHerinneringMutationResult = Apollo.MutationResult<UpdateHerinneringMutation>;
export type UpdateHerinneringMutationOptions = Apollo.BaseMutationOptions<UpdateHerinneringMutation, UpdateHerinneringMutationVariables>;
export const UpdateMediaDocument = gql`
    mutation UpdateMedia($datumVanMedia: DateTime!, $text: String!, $title: String!, $id: String!) {
  updateMedia(id: $id, datumVanMedia: $datumVanMedia, text: $text, title: $title) {
    id
    title
    text
  }
}
    `;
export type UpdateMediaMutationFn = Apollo.MutationFunction<UpdateMediaMutation, UpdateMediaMutationVariables>;

/**
 * __useUpdateMediaMutation__
 *
 * To run a mutation, you first call `useUpdateMediaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMediaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMediaMutation, { data, loading, error }] = useUpdateMediaMutation({
 *   variables: {
 *      datumVanMedia: // value for 'datumVanMedia'
 *      text: // value for 'text'
 *      title: // value for 'title'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateMediaMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMediaMutation, UpdateMediaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMediaMutation, UpdateMediaMutationVariables>(UpdateMediaDocument, options);
      }
export type UpdateMediaMutationHookResult = ReturnType<typeof useUpdateMediaMutation>;
export type UpdateMediaMutationResult = Apollo.MutationResult<UpdateMediaMutation>;
export type UpdateMediaMutationOptions = Apollo.BaseMutationOptions<UpdateMediaMutation, UpdateMediaMutationVariables>;
export const UpdatePasswordDocument = gql`
    mutation UpdatePassword($oldpassword: String!, $newPassword: String!) {
  UpdatePassword(oldpassword: $oldpassword, newPassword: $newPassword)
}
    `;
export type UpdatePasswordMutationFn = Apollo.MutationFunction<UpdatePasswordMutation, UpdatePasswordMutationVariables>;

/**
 * __useUpdatePasswordMutation__
 *
 * To run a mutation, you first call `useUpdatePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePasswordMutation, { data, loading, error }] = useUpdatePasswordMutation({
 *   variables: {
 *      oldpassword: // value for 'oldpassword'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useUpdatePasswordMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePasswordMutation, UpdatePasswordMutationVariables>(UpdatePasswordDocument, options);
      }
export type UpdatePasswordMutationHookResult = ReturnType<typeof useUpdatePasswordMutation>;
export type UpdatePasswordMutationResult = Apollo.MutationResult<UpdatePasswordMutation>;
export type UpdatePasswordMutationOptions = Apollo.BaseMutationOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>;
export const UpdatePersonalMessageDocument = gql`
    mutation updatePersonalMessage($id: String!, $title: String!, $text: String!, $dateAvailable: DateTime!, $paginaId: String!) {
  updatePersonalMessage(
    id: $id
    title: $title
    text: $text
    dateAvailable: $dateAvailable
    paginaId: $paginaId
  ) {
    id
    title
    text
    dateAvailable
  }
}
    `;
export type UpdatePersonalMessageMutationFn = Apollo.MutationFunction<UpdatePersonalMessageMutation, UpdatePersonalMessageMutationVariables>;

/**
 * __useUpdatePersonalMessageMutation__
 *
 * To run a mutation, you first call `useUpdatePersonalMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePersonalMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePersonalMessageMutation, { data, loading, error }] = useUpdatePersonalMessageMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      text: // value for 'text'
 *      dateAvailable: // value for 'dateAvailable'
 *      paginaId: // value for 'paginaId'
 *   },
 * });
 */
export function useUpdatePersonalMessageMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePersonalMessageMutation, UpdatePersonalMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePersonalMessageMutation, UpdatePersonalMessageMutationVariables>(UpdatePersonalMessageDocument, options);
      }
export type UpdatePersonalMessageMutationHookResult = ReturnType<typeof useUpdatePersonalMessageMutation>;
export type UpdatePersonalMessageMutationResult = Apollo.MutationResult<UpdatePersonalMessageMutation>;
export type UpdatePersonalMessageMutationOptions = Apollo.BaseMutationOptions<UpdatePersonalMessageMutation, UpdatePersonalMessageMutationVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($username: String!, $email: String!) {
  updateUser(username: $username, email: $email)
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const VerifyAccountDocument = gql`
    mutation VerifyAccount($token: String!) {
  verifyAccount(token: $token)
}
    `;
export type VerifyAccountMutationFn = Apollo.MutationFunction<VerifyAccountMutation, VerifyAccountMutationVariables>;

/**
 * __useVerifyAccountMutation__
 *
 * To run a mutation, you first call `useVerifyAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyAccountMutation, { data, loading, error }] = useVerifyAccountMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useVerifyAccountMutation(baseOptions?: Apollo.MutationHookOptions<VerifyAccountMutation, VerifyAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyAccountMutation, VerifyAccountMutationVariables>(VerifyAccountDocument, options);
      }
export type VerifyAccountMutationHookResult = ReturnType<typeof useVerifyAccountMutation>;
export type VerifyAccountMutationResult = Apollo.MutationResult<VerifyAccountMutation>;
export type VerifyAccountMutationOptions = Apollo.BaseMutationOptions<VerifyAccountMutation, VerifyAccountMutationVariables>;
export const VerifyPartnerDocument = gql`
    mutation VerifyPartner($partnerId: String!) {
  verifyPartner(partnerId: $partnerId)
}
    `;
export type VerifyPartnerMutationFn = Apollo.MutationFunction<VerifyPartnerMutation, VerifyPartnerMutationVariables>;

/**
 * __useVerifyPartnerMutation__
 *
 * To run a mutation, you first call `useVerifyPartnerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyPartnerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyPartnerMutation, { data, loading, error }] = useVerifyPartnerMutation({
 *   variables: {
 *      partnerId: // value for 'partnerId'
 *   },
 * });
 */
export function useVerifyPartnerMutation(baseOptions?: Apollo.MutationHookOptions<VerifyPartnerMutation, VerifyPartnerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyPartnerMutation, VerifyPartnerMutationVariables>(VerifyPartnerDocument, options);
      }
export type VerifyPartnerMutationHookResult = ReturnType<typeof useVerifyPartnerMutation>;
export type VerifyPartnerMutationResult = Apollo.MutationResult<VerifyPartnerMutation>;
export type VerifyPartnerMutationOptions = Apollo.BaseMutationOptions<VerifyPartnerMutation, VerifyPartnerMutationVariables>;
export const AccessRequestsByUserIdDocument = gql`
    query AccessRequestsByUserId {
  accessRequestsByUserId {
    id
    paginaId
    status
    requesttext
    requestor {
      id
      username
    }
    pagina {
      name_of_page
      mediaUrl
      DoB
      DoD
      text
      private_token
    }
  }
}
    `;

/**
 * __useAccessRequestsByUserIdQuery__
 *
 * To run a query within a React component, call `useAccessRequestsByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccessRequestsByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccessRequestsByUserIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useAccessRequestsByUserIdQuery(baseOptions?: Apollo.QueryHookOptions<AccessRequestsByUserIdQuery, AccessRequestsByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccessRequestsByUserIdQuery, AccessRequestsByUserIdQueryVariables>(AccessRequestsByUserIdDocument, options);
      }
export function useAccessRequestsByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccessRequestsByUserIdQuery, AccessRequestsByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccessRequestsByUserIdQuery, AccessRequestsByUserIdQueryVariables>(AccessRequestsByUserIdDocument, options);
        }
export type AccessRequestsByUserIdQueryHookResult = ReturnType<typeof useAccessRequestsByUserIdQuery>;
export type AccessRequestsByUserIdLazyQueryHookResult = ReturnType<typeof useAccessRequestsByUserIdLazyQuery>;
export type AccessRequestsByUserIdQueryResult = Apollo.QueryResult<AccessRequestsByUserIdQuery, AccessRequestsByUserIdQueryVariables>;
export const CheckBetalingDocument = gql`
    query CheckBetaling($redis_payment_mollie_id: String!) {
  checkBetaling(redis_payment_mollie_id: $redis_payment_mollie_id) {
    status
    aantal_dagen
  }
}
    `;

/**
 * __useCheckBetalingQuery__
 *
 * To run a query within a React component, call `useCheckBetalingQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckBetalingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckBetalingQuery({
 *   variables: {
 *      redis_payment_mollie_id: // value for 'redis_payment_mollie_id'
 *   },
 * });
 */
export function useCheckBetalingQuery(baseOptions: Apollo.QueryHookOptions<CheckBetalingQuery, CheckBetalingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckBetalingQuery, CheckBetalingQueryVariables>(CheckBetalingDocument, options);
      }
export function useCheckBetalingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckBetalingQuery, CheckBetalingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckBetalingQuery, CheckBetalingQueryVariables>(CheckBetalingDocument, options);
        }
export type CheckBetalingQueryHookResult = ReturnType<typeof useCheckBetalingQuery>;
export type CheckBetalingLazyQueryHookResult = ReturnType<typeof useCheckBetalingLazyQuery>;
export type CheckBetalingQueryResult = Apollo.QueryResult<CheckBetalingQuery, CheckBetalingQueryVariables>;
export const CheckForPersonalMessagesDocument = gql`
    query CheckForPersonalMessages($paginaId: String!) {
  checkForPersonalMessages(paginaId: $paginaId)
}
    `;

/**
 * __useCheckForPersonalMessagesQuery__
 *
 * To run a query within a React component, call `useCheckForPersonalMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckForPersonalMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckForPersonalMessagesQuery({
 *   variables: {
 *      paginaId: // value for 'paginaId'
 *   },
 * });
 */
export function useCheckForPersonalMessagesQuery(baseOptions: Apollo.QueryHookOptions<CheckForPersonalMessagesQuery, CheckForPersonalMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckForPersonalMessagesQuery, CheckForPersonalMessagesQueryVariables>(CheckForPersonalMessagesDocument, options);
      }
export function useCheckForPersonalMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckForPersonalMessagesQuery, CheckForPersonalMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckForPersonalMessagesQuery, CheckForPersonalMessagesQueryVariables>(CheckForPersonalMessagesDocument, options);
        }
export type CheckForPersonalMessagesQueryHookResult = ReturnType<typeof useCheckForPersonalMessagesQuery>;
export type CheckForPersonalMessagesLazyQueryHookResult = ReturnType<typeof useCheckForPersonalMessagesLazyQuery>;
export type CheckForPersonalMessagesQueryResult = Apollo.QueryResult<CheckForPersonalMessagesQuery, CheckForPersonalMessagesQueryVariables>;
export const CondolatieDocument = gql`
    query Condolatie($id: String!, $paginaId: String!) {
  condolatie(id: $id, paginaId: $paginaId) {
    id
    creator {
      id
      username
    }
    text
    media {
      id
      urlFile
    }
  }
}
    `;

/**
 * __useCondolatieQuery__
 *
 * To run a query within a React component, call `useCondolatieQuery` and pass it any options that fit your needs.
 * When your component renders, `useCondolatieQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCondolatieQuery({
 *   variables: {
 *      id: // value for 'id'
 *      paginaId: // value for 'paginaId'
 *   },
 * });
 */
export function useCondolatieQuery(baseOptions: Apollo.QueryHookOptions<CondolatieQuery, CondolatieQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CondolatieQuery, CondolatieQueryVariables>(CondolatieDocument, options);
      }
export function useCondolatieLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CondolatieQuery, CondolatieQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CondolatieQuery, CondolatieQueryVariables>(CondolatieDocument, options);
        }
export type CondolatieQueryHookResult = ReturnType<typeof useCondolatieQuery>;
export type CondolatieLazyQueryHookResult = ReturnType<typeof useCondolatieLazyQuery>;
export type CondolatieQueryResult = Apollo.QueryResult<CondolatieQuery, CondolatieQueryVariables>;
export const CondolatiesDocument = gql`
    query Condolaties($paginaId: String!, $limit: Int!, $cursor: String) {
  condolaties(paginaId: $paginaId, cursor: $cursor, limit: $limit) {
    hasMore
    condolaties {
      id
      text
      createdAt
      creator {
        username
      }
      media {
        id
        urlFile
        mediaType
      }
    }
  }
}
    `;

/**
 * __useCondolatiesQuery__
 *
 * To run a query within a React component, call `useCondolatiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCondolatiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCondolatiesQuery({
 *   variables: {
 *      paginaId: // value for 'paginaId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useCondolatiesQuery(baseOptions: Apollo.QueryHookOptions<CondolatiesQuery, CondolatiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CondolatiesQuery, CondolatiesQueryVariables>(CondolatiesDocument, options);
      }
export function useCondolatiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CondolatiesQuery, CondolatiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CondolatiesQuery, CondolatiesQueryVariables>(CondolatiesDocument, options);
        }
export type CondolatiesQueryHookResult = ReturnType<typeof useCondolatiesQuery>;
export type CondolatiesLazyQueryHookResult = ReturnType<typeof useCondolatiesLazyQuery>;
export type CondolatiesQueryResult = Apollo.QueryResult<CondolatiesQuery, CondolatiesQueryVariables>;
export const Condolaties_DemoDocument = gql`
    query Condolaties_Demo($paginaId: String!, $limit: Int!, $cursor: String) {
  condolaties_demo(paginaId: $paginaId, cursor: $cursor, limit: $limit) {
    hasMore
    condolaties {
      id
      text
      createdAt
      creator {
        username
      }
      media {
        id
        urlFile
        mediaType
      }
    }
  }
}
    `;

/**
 * __useCondolaties_DemoQuery__
 *
 * To run a query within a React component, call `useCondolaties_DemoQuery` and pass it any options that fit your needs.
 * When your component renders, `useCondolaties_DemoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCondolaties_DemoQuery({
 *   variables: {
 *      paginaId: // value for 'paginaId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useCondolaties_DemoQuery(baseOptions: Apollo.QueryHookOptions<Condolaties_DemoQuery, Condolaties_DemoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Condolaties_DemoQuery, Condolaties_DemoQueryVariables>(Condolaties_DemoDocument, options);
      }
export function useCondolaties_DemoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Condolaties_DemoQuery, Condolaties_DemoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Condolaties_DemoQuery, Condolaties_DemoQueryVariables>(Condolaties_DemoDocument, options);
        }
export type Condolaties_DemoQueryHookResult = ReturnType<typeof useCondolaties_DemoQuery>;
export type Condolaties_DemoLazyQueryHookResult = ReturnType<typeof useCondolaties_DemoLazyQuery>;
export type Condolaties_DemoQueryResult = Apollo.QueryResult<Condolaties_DemoQuery, Condolaties_DemoQueryVariables>;
export const FindAllPersonalMessagesOfCurrentUserForCurrentPageDocument = gql`
    query FindAllPersonalMessagesOfCurrentUserForCurrentPage($paginaId: String!) {
  findAllPersonalMessagesOfCurrentUserForCurrentPage(paginaId: $paginaId) {
    id
    title
    text
    dateAvailable
    media {
      urlFile
      mediaType
      id
      creatorId
    }
    updatedAt
    createdAt
  }
}
    `;

/**
 * __useFindAllPersonalMessagesOfCurrentUserForCurrentPageQuery__
 *
 * To run a query within a React component, call `useFindAllPersonalMessagesOfCurrentUserForCurrentPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllPersonalMessagesOfCurrentUserForCurrentPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllPersonalMessagesOfCurrentUserForCurrentPageQuery({
 *   variables: {
 *      paginaId: // value for 'paginaId'
 *   },
 * });
 */
export function useFindAllPersonalMessagesOfCurrentUserForCurrentPageQuery(baseOptions: Apollo.QueryHookOptions<FindAllPersonalMessagesOfCurrentUserForCurrentPageQuery, FindAllPersonalMessagesOfCurrentUserForCurrentPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllPersonalMessagesOfCurrentUserForCurrentPageQuery, FindAllPersonalMessagesOfCurrentUserForCurrentPageQueryVariables>(FindAllPersonalMessagesOfCurrentUserForCurrentPageDocument, options);
      }
export function useFindAllPersonalMessagesOfCurrentUserForCurrentPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllPersonalMessagesOfCurrentUserForCurrentPageQuery, FindAllPersonalMessagesOfCurrentUserForCurrentPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllPersonalMessagesOfCurrentUserForCurrentPageQuery, FindAllPersonalMessagesOfCurrentUserForCurrentPageQueryVariables>(FindAllPersonalMessagesOfCurrentUserForCurrentPageDocument, options);
        }
export type FindAllPersonalMessagesOfCurrentUserForCurrentPageQueryHookResult = ReturnType<typeof useFindAllPersonalMessagesOfCurrentUserForCurrentPageQuery>;
export type FindAllPersonalMessagesOfCurrentUserForCurrentPageLazyQueryHookResult = ReturnType<typeof useFindAllPersonalMessagesOfCurrentUserForCurrentPageLazyQuery>;
export type FindAllPersonalMessagesOfCurrentUserForCurrentPageQueryResult = Apollo.QueryResult<FindAllPersonalMessagesOfCurrentUserForCurrentPageQuery, FindAllPersonalMessagesOfCurrentUserForCurrentPageQueryVariables>;
export const GetMollieSubscriptionForPageDocument = gql`
    query GetMollieSubscriptionForPage($public_token: String!) {
  getMollieSubscriptionForPage(public_token: $public_token) {
    mollieSubscriptionId
    nextPaymentDate
    startDate
    status
    description
    interval
    payment_plan
  }
}
    `;

/**
 * __useGetMollieSubscriptionForPageQuery__
 *
 * To run a query within a React component, call `useGetMollieSubscriptionForPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMollieSubscriptionForPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMollieSubscriptionForPageQuery({
 *   variables: {
 *      public_token: // value for 'public_token'
 *   },
 * });
 */
export function useGetMollieSubscriptionForPageQuery(baseOptions: Apollo.QueryHookOptions<GetMollieSubscriptionForPageQuery, GetMollieSubscriptionForPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMollieSubscriptionForPageQuery, GetMollieSubscriptionForPageQueryVariables>(GetMollieSubscriptionForPageDocument, options);
      }
export function useGetMollieSubscriptionForPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMollieSubscriptionForPageQuery, GetMollieSubscriptionForPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMollieSubscriptionForPageQuery, GetMollieSubscriptionForPageQueryVariables>(GetMollieSubscriptionForPageDocument, options);
        }
export type GetMollieSubscriptionForPageQueryHookResult = ReturnType<typeof useGetMollieSubscriptionForPageQuery>;
export type GetMollieSubscriptionForPageLazyQueryHookResult = ReturnType<typeof useGetMollieSubscriptionForPageLazyQuery>;
export type GetMollieSubscriptionForPageQueryResult = Apollo.QueryResult<GetMollieSubscriptionForPageQuery, GetMollieSubscriptionForPageQueryVariables>;
export const GetMollieSubscriptionsDocument = gql`
    query GetMollieSubscriptions($public_token: String!) {
  getMollieSubscriptions(public_token: $public_token)
}
    `;

/**
 * __useGetMollieSubscriptionsQuery__
 *
 * To run a query within a React component, call `useGetMollieSubscriptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMollieSubscriptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMollieSubscriptionsQuery({
 *   variables: {
 *      public_token: // value for 'public_token'
 *   },
 * });
 */
export function useGetMollieSubscriptionsQuery(baseOptions: Apollo.QueryHookOptions<GetMollieSubscriptionsQuery, GetMollieSubscriptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMollieSubscriptionsQuery, GetMollieSubscriptionsQueryVariables>(GetMollieSubscriptionsDocument, options);
      }
export function useGetMollieSubscriptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMollieSubscriptionsQuery, GetMollieSubscriptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMollieSubscriptionsQuery, GetMollieSubscriptionsQueryVariables>(GetMollieSubscriptionsDocument, options);
        }
export type GetMollieSubscriptionsQueryHookResult = ReturnType<typeof useGetMollieSubscriptionsQuery>;
export type GetMollieSubscriptionsLazyQueryHookResult = ReturnType<typeof useGetMollieSubscriptionsLazyQuery>;
export type GetMollieSubscriptionsQueryResult = Apollo.QueryResult<GetMollieSubscriptionsQuery, GetMollieSubscriptionsQueryVariables>;
export const HerdenkingspaginaDocument = gql`
    query Herdenkingspagina($paginaId: String!) {
  herdenkingspagina(paginaId: $paginaId) {
    id
    name_of_page
    condoleance_active
    shareable
    accessible
    control_before
    DesignType
    DoB
    DoD
    ValidUntil
    owner {
      username
      id
    }
    mediaUrl
    text
    number_of_memories
    Payment_plan
    Payment_status
    number_of_personal_messages
    number_of_messages
    number_of_condolances
    number_of_media
    number_of_people
    number_of_bytes
  }
}
    `;

/**
 * __useHerdenkingspaginaQuery__
 *
 * To run a query within a React component, call `useHerdenkingspaginaQuery` and pass it any options that fit your needs.
 * When your component renders, `useHerdenkingspaginaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHerdenkingspaginaQuery({
 *   variables: {
 *      paginaId: // value for 'paginaId'
 *   },
 * });
 */
export function useHerdenkingspaginaQuery(baseOptions: Apollo.QueryHookOptions<HerdenkingspaginaQuery, HerdenkingspaginaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HerdenkingspaginaQuery, HerdenkingspaginaQueryVariables>(HerdenkingspaginaDocument, options);
      }
export function useHerdenkingspaginaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HerdenkingspaginaQuery, HerdenkingspaginaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HerdenkingspaginaQuery, HerdenkingspaginaQueryVariables>(HerdenkingspaginaDocument, options);
        }
export type HerdenkingspaginaQueryHookResult = ReturnType<typeof useHerdenkingspaginaQuery>;
export type HerdenkingspaginaLazyQueryHookResult = ReturnType<typeof useHerdenkingspaginaLazyQuery>;
export type HerdenkingspaginaQueryResult = Apollo.QueryResult<HerdenkingspaginaQuery, HerdenkingspaginaQueryVariables>;
export const HerdenkingspaginaprivatetokenDocument = gql`
    query Herdenkingspaginaprivatetoken($paginaId: String!) {
  herdenkingspaginaprivatetoken(paginaId: $paginaId) {
    id
    name_of_page
    DoB
    DoD
    Payment_plan
    Payment_status
    condoleance_active
    control_before
    shareable
    accessible
    createdAt
    owner {
      username
      id
    }
    mediaUrl
    text
    private_token
    ValidUntil
    number_of_memories
    number_of_personal_messages
    number_of_messages
    number_of_condolances
    number_of_media
    number_of_people
    number_of_bytes
  }
}
    `;

/**
 * __useHerdenkingspaginaprivatetokenQuery__
 *
 * To run a query within a React component, call `useHerdenkingspaginaprivatetokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useHerdenkingspaginaprivatetokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHerdenkingspaginaprivatetokenQuery({
 *   variables: {
 *      paginaId: // value for 'paginaId'
 *   },
 * });
 */
export function useHerdenkingspaginaprivatetokenQuery(baseOptions: Apollo.QueryHookOptions<HerdenkingspaginaprivatetokenQuery, HerdenkingspaginaprivatetokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HerdenkingspaginaprivatetokenQuery, HerdenkingspaginaprivatetokenQueryVariables>(HerdenkingspaginaprivatetokenDocument, options);
      }
export function useHerdenkingspaginaprivatetokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HerdenkingspaginaprivatetokenQuery, HerdenkingspaginaprivatetokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HerdenkingspaginaprivatetokenQuery, HerdenkingspaginaprivatetokenQueryVariables>(HerdenkingspaginaprivatetokenDocument, options);
        }
export type HerdenkingspaginaprivatetokenQueryHookResult = ReturnType<typeof useHerdenkingspaginaprivatetokenQuery>;
export type HerdenkingspaginaprivatetokenLazyQueryHookResult = ReturnType<typeof useHerdenkingspaginaprivatetokenLazyQuery>;
export type HerdenkingspaginaprivatetokenQueryResult = Apollo.QueryResult<HerdenkingspaginaprivatetokenQuery, HerdenkingspaginaprivatetokenQueryVariables>;
export const HerinneringDocument = gql`
    query Herinnering($id: String!, $paginaId: String!) {
  herinnering(id: $id, paginaId: $paginaId) {
    id
    title
    text
    categorie
    status
    on_timeline
    datumVanHerinnering
    creator {
      id
      username
    }
    media {
      id
      text
      title
      urlFile
      mediaType
    }
    comments {
      id
      comment
      createdAt
      creator {
        id
        username
      }
    }
  }
}
    `;

/**
 * __useHerinneringQuery__
 *
 * To run a query within a React component, call `useHerinneringQuery` and pass it any options that fit your needs.
 * When your component renders, `useHerinneringQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHerinneringQuery({
 *   variables: {
 *      id: // value for 'id'
 *      paginaId: // value for 'paginaId'
 *   },
 * });
 */
export function useHerinneringQuery(baseOptions: Apollo.QueryHookOptions<HerinneringQuery, HerinneringQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HerinneringQuery, HerinneringQueryVariables>(HerinneringDocument, options);
      }
export function useHerinneringLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HerinneringQuery, HerinneringQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HerinneringQuery, HerinneringQueryVariables>(HerinneringDocument, options);
        }
export type HerinneringQueryHookResult = ReturnType<typeof useHerinneringQuery>;
export type HerinneringLazyQueryHookResult = ReturnType<typeof useHerinneringLazyQuery>;
export type HerinneringQueryResult = Apollo.QueryResult<HerinneringQuery, HerinneringQueryVariables>;
export const Herinnering_DemoDocument = gql`
    query Herinnering_demo($id: String!, $paginaId: String!) {
  herinnering_demo(id: $id, paginaId: $paginaId) {
    id
    title
    text
    categorie
    status
    on_timeline
    datumVanHerinnering
    creator {
      id
      username
    }
    media {
      id
      text
      title
      urlFile
      mediaType
    }
    comments {
      id
      comment
      createdAt
      creator {
        id
        username
      }
    }
  }
}
    `;

/**
 * __useHerinnering_DemoQuery__
 *
 * To run a query within a React component, call `useHerinnering_DemoQuery` and pass it any options that fit your needs.
 * When your component renders, `useHerinnering_DemoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHerinnering_DemoQuery({
 *   variables: {
 *      id: // value for 'id'
 *      paginaId: // value for 'paginaId'
 *   },
 * });
 */
export function useHerinnering_DemoQuery(baseOptions: Apollo.QueryHookOptions<Herinnering_DemoQuery, Herinnering_DemoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Herinnering_DemoQuery, Herinnering_DemoQueryVariables>(Herinnering_DemoDocument, options);
      }
export function useHerinnering_DemoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Herinnering_DemoQuery, Herinnering_DemoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Herinnering_DemoQuery, Herinnering_DemoQueryVariables>(Herinnering_DemoDocument, options);
        }
export type Herinnering_DemoQueryHookResult = ReturnType<typeof useHerinnering_DemoQuery>;
export type Herinnering_DemoLazyQueryHookResult = ReturnType<typeof useHerinnering_DemoLazyQuery>;
export type Herinnering_DemoQueryResult = Apollo.QueryResult<Herinnering_DemoQuery, Herinnering_DemoQueryVariables>;
export const HerinneringenDocument = gql`
    query Herinneringen($limit: Int!, $cursor: String, $paginaId: String!) {
  herinneringen(cursor: $cursor, limit: $limit, paginaId: $paginaId) {
    herinneringen {
      id
      text
      title
      categorie
      datumVanHerinnering
      status
      createdAt
      creator {
        username
      }
      media {
        text
        title
        urlFile
        mediaType
        creator {
          username
        }
      }
      comments {
        id
        comment
        creator {
          id
          username
        }
      }
    }
    hasMore
  }
}
    `;

/**
 * __useHerinneringenQuery__
 *
 * To run a query within a React component, call `useHerinneringenQuery` and pass it any options that fit your needs.
 * When your component renders, `useHerinneringenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHerinneringenQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      paginaId: // value for 'paginaId'
 *   },
 * });
 */
export function useHerinneringenQuery(baseOptions: Apollo.QueryHookOptions<HerinneringenQuery, HerinneringenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HerinneringenQuery, HerinneringenQueryVariables>(HerinneringenDocument, options);
      }
export function useHerinneringenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HerinneringenQuery, HerinneringenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HerinneringenQuery, HerinneringenQueryVariables>(HerinneringenDocument, options);
        }
export type HerinneringenQueryHookResult = ReturnType<typeof useHerinneringenQuery>;
export type HerinneringenLazyQueryHookResult = ReturnType<typeof useHerinneringenLazyQuery>;
export type HerinneringenQueryResult = Apollo.QueryResult<HerinneringenQuery, HerinneringenQueryVariables>;
export const HerinneringenByDateDocument = gql`
    query HerinneringenByDate($paginaId: String!) {
  herinneringenByDate(paginaId: $paginaId) {
    id
    text
    title
    categorie
    status
    datumVanHerinnering
    createdAt
    creator {
      username
    }
    media {
      text
      title
      urlFile
      mediaType
      creator {
        username
      }
    }
    comments {
      id
      comment
      creator {
        id
        username
      }
    }
  }
}
    `;

/**
 * __useHerinneringenByDateQuery__
 *
 * To run a query within a React component, call `useHerinneringenByDateQuery` and pass it any options that fit your needs.
 * When your component renders, `useHerinneringenByDateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHerinneringenByDateQuery({
 *   variables: {
 *      paginaId: // value for 'paginaId'
 *   },
 * });
 */
export function useHerinneringenByDateQuery(baseOptions: Apollo.QueryHookOptions<HerinneringenByDateQuery, HerinneringenByDateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HerinneringenByDateQuery, HerinneringenByDateQueryVariables>(HerinneringenByDateDocument, options);
      }
export function useHerinneringenByDateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HerinneringenByDateQuery, HerinneringenByDateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HerinneringenByDateQuery, HerinneringenByDateQueryVariables>(HerinneringenByDateDocument, options);
        }
export type HerinneringenByDateQueryHookResult = ReturnType<typeof useHerinneringenByDateQuery>;
export type HerinneringenByDateLazyQueryHookResult = ReturnType<typeof useHerinneringenByDateLazyQuery>;
export type HerinneringenByDateQueryResult = Apollo.QueryResult<HerinneringenByDateQuery, HerinneringenByDateQueryVariables>;
export const HerinneringenByDate_DemoDocument = gql`
    query HerinneringenByDate_demo($paginaId: String!) {
  herinneringenByDate_demo(paginaId: $paginaId) {
    id
    text
    title
    categorie
    status
    datumVanHerinnering
    createdAt
    creator {
      username
    }
    media {
      text
      title
      urlFile
      mediaType
      creator {
        username
      }
    }
    comments {
      id
      comment
      creator {
        id
        username
      }
    }
  }
}
    `;

/**
 * __useHerinneringenByDate_DemoQuery__
 *
 * To run a query within a React component, call `useHerinneringenByDate_DemoQuery` and pass it any options that fit your needs.
 * When your component renders, `useHerinneringenByDate_DemoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHerinneringenByDate_DemoQuery({
 *   variables: {
 *      paginaId: // value for 'paginaId'
 *   },
 * });
 */
export function useHerinneringenByDate_DemoQuery(baseOptions: Apollo.QueryHookOptions<HerinneringenByDate_DemoQuery, HerinneringenByDate_DemoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HerinneringenByDate_DemoQuery, HerinneringenByDate_DemoQueryVariables>(HerinneringenByDate_DemoDocument, options);
      }
export function useHerinneringenByDate_DemoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HerinneringenByDate_DemoQuery, HerinneringenByDate_DemoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HerinneringenByDate_DemoQuery, HerinneringenByDate_DemoQueryVariables>(HerinneringenByDate_DemoDocument, options);
        }
export type HerinneringenByDate_DemoQueryHookResult = ReturnType<typeof useHerinneringenByDate_DemoQuery>;
export type HerinneringenByDate_DemoLazyQueryHookResult = ReturnType<typeof useHerinneringenByDate_DemoLazyQuery>;
export type HerinneringenByDate_DemoQueryResult = Apollo.QueryResult<HerinneringenByDate_DemoQuery, HerinneringenByDate_DemoQueryVariables>;
export const Herinneringen_DemoDocument = gql`
    query Herinneringen_Demo($limit: Int!, $cursor: String, $paginaId: String!) {
  herinneringen_demo(cursor: $cursor, limit: $limit, paginaId: $paginaId) {
    herinneringen {
      id
      text
      title
      categorie
      datumVanHerinnering
      status
      createdAt
      creator {
        username
      }
      media {
        text
        title
        urlFile
        mediaType
        creator {
          username
        }
      }
      comments {
        id
        comment
        creator {
          id
          username
        }
      }
    }
    hasMore
  }
}
    `;

/**
 * __useHerinneringen_DemoQuery__
 *
 * To run a query within a React component, call `useHerinneringen_DemoQuery` and pass it any options that fit your needs.
 * When your component renders, `useHerinneringen_DemoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHerinneringen_DemoQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      paginaId: // value for 'paginaId'
 *   },
 * });
 */
export function useHerinneringen_DemoQuery(baseOptions: Apollo.QueryHookOptions<Herinneringen_DemoQuery, Herinneringen_DemoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Herinneringen_DemoQuery, Herinneringen_DemoQueryVariables>(Herinneringen_DemoDocument, options);
      }
export function useHerinneringen_DemoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Herinneringen_DemoQuery, Herinneringen_DemoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Herinneringen_DemoQuery, Herinneringen_DemoQueryVariables>(Herinneringen_DemoDocument, options);
        }
export type Herinneringen_DemoQueryHookResult = ReturnType<typeof useHerinneringen_DemoQuery>;
export type Herinneringen_DemoLazyQueryHookResult = ReturnType<typeof useHerinneringen_DemoLazyQuery>;
export type Herinneringen_DemoQueryResult = Apollo.QueryResult<Herinneringen_DemoQuery, Herinneringen_DemoQueryVariables>;
export const Herinneringen_GallerijDocument = gql`
    query herinneringen_gallerij($limit: Int!, $cursor: String, $paginaId: String!) {
  herinneringen_gallerij(cursor: $cursor, limit: $limit, paginaId: $paginaId) {
    mediaHerinneringen {
      id
      createdAt
      herinneringId
      urlFile
      mediaType
      creator {
        username
      }
    }
    hasMore
  }
}
    `;

/**
 * __useHerinneringen_GallerijQuery__
 *
 * To run a query within a React component, call `useHerinneringen_GallerijQuery` and pass it any options that fit your needs.
 * When your component renders, `useHerinneringen_GallerijQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHerinneringen_GallerijQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      paginaId: // value for 'paginaId'
 *   },
 * });
 */
export function useHerinneringen_GallerijQuery(baseOptions: Apollo.QueryHookOptions<Herinneringen_GallerijQuery, Herinneringen_GallerijQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Herinneringen_GallerijQuery, Herinneringen_GallerijQueryVariables>(Herinneringen_GallerijDocument, options);
      }
export function useHerinneringen_GallerijLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Herinneringen_GallerijQuery, Herinneringen_GallerijQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Herinneringen_GallerijQuery, Herinneringen_GallerijQueryVariables>(Herinneringen_GallerijDocument, options);
        }
export type Herinneringen_GallerijQueryHookResult = ReturnType<typeof useHerinneringen_GallerijQuery>;
export type Herinneringen_GallerijLazyQueryHookResult = ReturnType<typeof useHerinneringen_GallerijLazyQuery>;
export type Herinneringen_GallerijQueryResult = Apollo.QueryResult<Herinneringen_GallerijQuery, Herinneringen_GallerijQueryVariables>;
export const Herinneringen_Gallerij_DemoDocument = gql`
    query herinneringen_gallerij_demo($limit: Int!, $cursor: String, $paginaId: String!) {
  herinneringen_gallerij_demo(cursor: $cursor, limit: $limit, paginaId: $paginaId) {
    mediaHerinneringen {
      id
      createdAt
      herinneringId
      urlFile
      mediaType
      creator {
        username
      }
    }
    hasMore
  }
}
    `;

/**
 * __useHerinneringen_Gallerij_DemoQuery__
 *
 * To run a query within a React component, call `useHerinneringen_Gallerij_DemoQuery` and pass it any options that fit your needs.
 * When your component renders, `useHerinneringen_Gallerij_DemoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHerinneringen_Gallerij_DemoQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      paginaId: // value for 'paginaId'
 *   },
 * });
 */
export function useHerinneringen_Gallerij_DemoQuery(baseOptions: Apollo.QueryHookOptions<Herinneringen_Gallerij_DemoQuery, Herinneringen_Gallerij_DemoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Herinneringen_Gallerij_DemoQuery, Herinneringen_Gallerij_DemoQueryVariables>(Herinneringen_Gallerij_DemoDocument, options);
      }
export function useHerinneringen_Gallerij_DemoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Herinneringen_Gallerij_DemoQuery, Herinneringen_Gallerij_DemoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Herinneringen_Gallerij_DemoQuery, Herinneringen_Gallerij_DemoQueryVariables>(Herinneringen_Gallerij_DemoDocument, options);
        }
export type Herinneringen_Gallerij_DemoQueryHookResult = ReturnType<typeof useHerinneringen_Gallerij_DemoQuery>;
export type Herinneringen_Gallerij_DemoLazyQueryHookResult = ReturnType<typeof useHerinneringen_Gallerij_DemoLazyQuery>;
export type Herinneringen_Gallerij_DemoQueryResult = Apollo.QueryResult<Herinneringen_Gallerij_DemoQuery, Herinneringen_Gallerij_DemoQueryVariables>;
export const IndexPageDocument = gql`
    query IndexPage($public_or_private_token: String!) {
  indexPage(public_or_private_token: $public_or_private_token) {
    accessLevel
    herdenkingspagina {
      id
      mediaUrl
      name_of_page
      text
      DoB
      DoD
      condoleance_active
      shareable
      accessible
      control_before
      number_of_people
      Payment_plan
      DesignType
    }
    privaat_of_publiek
    accessToken
  }
}
    `;

/**
 * __useIndexPageQuery__
 *
 * To run a query within a React component, call `useIndexPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useIndexPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIndexPageQuery({
 *   variables: {
 *      public_or_private_token: // value for 'public_or_private_token'
 *   },
 * });
 */
export function useIndexPageQuery(baseOptions: Apollo.QueryHookOptions<IndexPageQuery, IndexPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IndexPageQuery, IndexPageQueryVariables>(IndexPageDocument, options);
      }
export function useIndexPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IndexPageQuery, IndexPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IndexPageQuery, IndexPageQueryVariables>(IndexPageDocument, options);
        }
export type IndexPageQueryHookResult = ReturnType<typeof useIndexPageQuery>;
export type IndexPageLazyQueryHookResult = ReturnType<typeof useIndexPageLazyQuery>;
export type IndexPageQueryResult = Apollo.QueryResult<IndexPageQuery, IndexPageQueryVariables>;
export const MeDocument = gql`
    query Me($paginaId: String) {
  me(paginaId: $paginaId) {
    user {
      username
      account_status
      id
      email
    }
    status
    partner_type
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *      paginaId: // value for 'paginaId'
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MessagesDocument = gql`
    query Messages($paginaId: String!, $limit: Int!, $cursor: String) {
  messages(paginaId: $paginaId, cursor: $cursor, limit: $limit) {
    hasMore
    berichten {
      id
      text
      createdAt
      status
      creator {
        username
      }
      media {
        id
        urlFile
        mediaType
      }
    }
  }
}
    `;

/**
 * __useMessagesQuery__
 *
 * To run a query within a React component, call `useMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesQuery({
 *   variables: {
 *      paginaId: // value for 'paginaId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useMessagesQuery(baseOptions: Apollo.QueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
      }
export function useMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
        }
export type MessagesQueryHookResult = ReturnType<typeof useMessagesQuery>;
export type MessagesLazyQueryHookResult = ReturnType<typeof useMessagesLazyQuery>;
export type MessagesQueryResult = Apollo.QueryResult<MessagesQuery, MessagesQueryVariables>;
export const Messages_DemoDocument = gql`
    query Messages_demo($paginaId: String!, $limit: Int!, $cursor: String) {
  messages_demo(paginaId: $paginaId, cursor: $cursor, limit: $limit) {
    hasMore
    berichten {
      id
      text
      createdAt
      status
      creator {
        username
      }
      media {
        id
        urlFile
        mediaType
      }
    }
  }
}
    `;

/**
 * __useMessages_DemoQuery__
 *
 * To run a query within a React component, call `useMessages_DemoQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessages_DemoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessages_DemoQuery({
 *   variables: {
 *      paginaId: // value for 'paginaId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useMessages_DemoQuery(baseOptions: Apollo.QueryHookOptions<Messages_DemoQuery, Messages_DemoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Messages_DemoQuery, Messages_DemoQueryVariables>(Messages_DemoDocument, options);
      }
export function useMessages_DemoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Messages_DemoQuery, Messages_DemoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Messages_DemoQuery, Messages_DemoQueryVariables>(Messages_DemoDocument, options);
        }
export type Messages_DemoQueryHookResult = ReturnType<typeof useMessages_DemoQuery>;
export type Messages_DemoLazyQueryHookResult = ReturnType<typeof useMessages_DemoLazyQuery>;
export type Messages_DemoQueryResult = Apollo.QueryResult<Messages_DemoQuery, Messages_DemoQueryVariables>;
export const OwnMessagesDocument = gql`
    query OwnMessages($paginaId: String!, $limit: Int!, $cursor: String) {
  ownMessages(paginaId: $paginaId, cursor: $cursor, limit: $limit) {
    hasMore
    berichten {
      id
      text
      status
      createdAt
      creator {
        username
      }
      media {
        id
        urlFile
        mediaType
      }
    }
  }
}
    `;

/**
 * __useOwnMessagesQuery__
 *
 * To run a query within a React component, call `useOwnMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useOwnMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOwnMessagesQuery({
 *   variables: {
 *      paginaId: // value for 'paginaId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useOwnMessagesQuery(baseOptions: Apollo.QueryHookOptions<OwnMessagesQuery, OwnMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OwnMessagesQuery, OwnMessagesQueryVariables>(OwnMessagesDocument, options);
      }
export function useOwnMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OwnMessagesQuery, OwnMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OwnMessagesQuery, OwnMessagesQueryVariables>(OwnMessagesDocument, options);
        }
export type OwnMessagesQueryHookResult = ReturnType<typeof useOwnMessagesQuery>;
export type OwnMessagesLazyQueryHookResult = ReturnType<typeof useOwnMessagesLazyQuery>;
export type OwnMessagesQueryResult = Apollo.QueryResult<OwnMessagesQuery, OwnMessagesQueryVariables>;
export const PersonalMessagesDocument = gql`
    query PersonalMessages($paginaId: String!, $limit: Int!, $cursor: String) {
  personalMessages(paginaId: $paginaId, cursor: $cursor, limit: $limit) {
    PersonalMessages {
      id
      text
      title
      paginaId
      dateAvailable
      media {
        text
        title
        urlFile
        mediaType
        id
        creatorId
        createdAt
        updatedAt
        creator {
          username
        }
        comments {
          id
        }
      }
      createdAt
      updatedAt
    }
    hasMore
  }
}
    `;

/**
 * __usePersonalMessagesQuery__
 *
 * To run a query within a React component, call `usePersonalMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePersonalMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePersonalMessagesQuery({
 *   variables: {
 *      paginaId: // value for 'paginaId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function usePersonalMessagesQuery(baseOptions: Apollo.QueryHookOptions<PersonalMessagesQuery, PersonalMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PersonalMessagesQuery, PersonalMessagesQueryVariables>(PersonalMessagesDocument, options);
      }
export function usePersonalMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PersonalMessagesQuery, PersonalMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PersonalMessagesQuery, PersonalMessagesQueryVariables>(PersonalMessagesDocument, options);
        }
export type PersonalMessagesQueryHookResult = ReturnType<typeof usePersonalMessagesQuery>;
export type PersonalMessagesLazyQueryHookResult = ReturnType<typeof usePersonalMessagesLazyQuery>;
export type PersonalMessagesQueryResult = Apollo.QueryResult<PersonalMessagesQuery, PersonalMessagesQueryVariables>;
export const PersonalMessagesAccessForCurrentPageDocument = gql`
    query PersonalMessagesAccessForCurrentPage($paginaId: String!) {
  personalMessagesAccessForCurrentPage(paginaId: $paginaId) {
    id
    personalMessageId
    userThatHasAccess {
      email
      id
      username
    }
  }
}
    `;

/**
 * __usePersonalMessagesAccessForCurrentPageQuery__
 *
 * To run a query within a React component, call `usePersonalMessagesAccessForCurrentPageQuery` and pass it any options that fit your needs.
 * When your component renders, `usePersonalMessagesAccessForCurrentPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePersonalMessagesAccessForCurrentPageQuery({
 *   variables: {
 *      paginaId: // value for 'paginaId'
 *   },
 * });
 */
export function usePersonalMessagesAccessForCurrentPageQuery(baseOptions: Apollo.QueryHookOptions<PersonalMessagesAccessForCurrentPageQuery, PersonalMessagesAccessForCurrentPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PersonalMessagesAccessForCurrentPageQuery, PersonalMessagesAccessForCurrentPageQueryVariables>(PersonalMessagesAccessForCurrentPageDocument, options);
      }
export function usePersonalMessagesAccessForCurrentPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PersonalMessagesAccessForCurrentPageQuery, PersonalMessagesAccessForCurrentPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PersonalMessagesAccessForCurrentPageQuery, PersonalMessagesAccessForCurrentPageQueryVariables>(PersonalMessagesAccessForCurrentPageDocument, options);
        }
export type PersonalMessagesAccessForCurrentPageQueryHookResult = ReturnType<typeof usePersonalMessagesAccessForCurrentPageQuery>;
export type PersonalMessagesAccessForCurrentPageLazyQueryHookResult = ReturnType<typeof usePersonalMessagesAccessForCurrentPageLazyQuery>;
export type PersonalMessagesAccessForCurrentPageQueryResult = Apollo.QueryResult<PersonalMessagesAccessForCurrentPageQuery, PersonalMessagesAccessForCurrentPageQueryVariables>;
export const PersonalMessagesAccessForPersonalMessageDocument = gql`
    query personalMessagesAccessForPersonalMessage($paginaId: String!, $personalmessage_id: String!) {
  personalMessagesAccessForPersonalMessage(
    paginaId: $paginaId
    personalmessage_id: $personalmessage_id
  ) {
    userThatHasAccess {
      email
      id
      username
    }
  }
}
    `;

/**
 * __usePersonalMessagesAccessForPersonalMessageQuery__
 *
 * To run a query within a React component, call `usePersonalMessagesAccessForPersonalMessageQuery` and pass it any options that fit your needs.
 * When your component renders, `usePersonalMessagesAccessForPersonalMessageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePersonalMessagesAccessForPersonalMessageQuery({
 *   variables: {
 *      paginaId: // value for 'paginaId'
 *      personalmessage_id: // value for 'personalmessage_id'
 *   },
 * });
 */
export function usePersonalMessagesAccessForPersonalMessageQuery(baseOptions: Apollo.QueryHookOptions<PersonalMessagesAccessForPersonalMessageQuery, PersonalMessagesAccessForPersonalMessageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PersonalMessagesAccessForPersonalMessageQuery, PersonalMessagesAccessForPersonalMessageQueryVariables>(PersonalMessagesAccessForPersonalMessageDocument, options);
      }
export function usePersonalMessagesAccessForPersonalMessageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PersonalMessagesAccessForPersonalMessageQuery, PersonalMessagesAccessForPersonalMessageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PersonalMessagesAccessForPersonalMessageQuery, PersonalMessagesAccessForPersonalMessageQueryVariables>(PersonalMessagesAccessForPersonalMessageDocument, options);
        }
export type PersonalMessagesAccessForPersonalMessageQueryHookResult = ReturnType<typeof usePersonalMessagesAccessForPersonalMessageQuery>;
export type PersonalMessagesAccessForPersonalMessageLazyQueryHookResult = ReturnType<typeof usePersonalMessagesAccessForPersonalMessageLazyQuery>;
export type PersonalMessagesAccessForPersonalMessageQueryResult = Apollo.QueryResult<PersonalMessagesAccessForPersonalMessageQuery, PersonalMessagesAccessForPersonalMessageQueryVariables>;
export const PersonalMessageDocument = gql`
    query PersonalMessage($id: String!, $paginaId: String!) {
  personalmessage(id: $id, paginaId: $paginaId) {
    id
    title
    text
    dateAvailable
    media {
      id
      text
      title
      urlFile
      mediaType
      objectSize
    }
  }
}
    `;

/**
 * __usePersonalMessageQuery__
 *
 * To run a query within a React component, call `usePersonalMessageQuery` and pass it any options that fit your needs.
 * When your component renders, `usePersonalMessageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePersonalMessageQuery({
 *   variables: {
 *      id: // value for 'id'
 *      paginaId: // value for 'paginaId'
 *   },
 * });
 */
export function usePersonalMessageQuery(baseOptions: Apollo.QueryHookOptions<PersonalMessageQuery, PersonalMessageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PersonalMessageQuery, PersonalMessageQueryVariables>(PersonalMessageDocument, options);
      }
export function usePersonalMessageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PersonalMessageQuery, PersonalMessageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PersonalMessageQuery, PersonalMessageQueryVariables>(PersonalMessageDocument, options);
        }
export type PersonalMessageQueryHookResult = ReturnType<typeof usePersonalMessageQuery>;
export type PersonalMessageLazyQueryHookResult = ReturnType<typeof usePersonalMessageLazyQuery>;
export type PersonalMessageQueryResult = Apollo.QueryResult<PersonalMessageQuery, PersonalMessageQueryVariables>;
export const PersonalMessage_DemoDocument = gql`
    query PersonalMessage_demo($id: String!, $paginaId: String!) {
  personalmessage_demo(id: $id, paginaId: $paginaId) {
    id
    title
    text
    dateAvailable
    media {
      id
      text
      title
      urlFile
      mediaType
      objectSize
    }
  }
}
    `;

/**
 * __usePersonalMessage_DemoQuery__
 *
 * To run a query within a React component, call `usePersonalMessage_DemoQuery` and pass it any options that fit your needs.
 * When your component renders, `usePersonalMessage_DemoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePersonalMessage_DemoQuery({
 *   variables: {
 *      id: // value for 'id'
 *      paginaId: // value for 'paginaId'
 *   },
 * });
 */
export function usePersonalMessage_DemoQuery(baseOptions: Apollo.QueryHookOptions<PersonalMessage_DemoQuery, PersonalMessage_DemoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PersonalMessage_DemoQuery, PersonalMessage_DemoQueryVariables>(PersonalMessage_DemoDocument, options);
      }
export function usePersonalMessage_DemoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PersonalMessage_DemoQuery, PersonalMessage_DemoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PersonalMessage_DemoQuery, PersonalMessage_DemoQueryVariables>(PersonalMessage_DemoDocument, options);
        }
export type PersonalMessage_DemoQueryHookResult = ReturnType<typeof usePersonalMessage_DemoQuery>;
export type PersonalMessage_DemoLazyQueryHookResult = ReturnType<typeof usePersonalMessage_DemoLazyQuery>;
export type PersonalMessage_DemoQueryResult = Apollo.QueryResult<PersonalMessage_DemoQuery, PersonalMessage_DemoQueryVariables>;
export const PersonalMessages_DemoDocument = gql`
    query PersonalMessages_demo($paginaId: String!) {
  personalmessages_demo(paginaId: $paginaId) {
    id
    title
    text
    dateAvailable
    media {
      urlFile
      mediaType
      id
      creatorId
    }
    updatedAt
    createdAt
  }
}
    `;

/**
 * __usePersonalMessages_DemoQuery__
 *
 * To run a query within a React component, call `usePersonalMessages_DemoQuery` and pass it any options that fit your needs.
 * When your component renders, `usePersonalMessages_DemoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePersonalMessages_DemoQuery({
 *   variables: {
 *      paginaId: // value for 'paginaId'
 *   },
 * });
 */
export function usePersonalMessages_DemoQuery(baseOptions: Apollo.QueryHookOptions<PersonalMessages_DemoQuery, PersonalMessages_DemoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PersonalMessages_DemoQuery, PersonalMessages_DemoQueryVariables>(PersonalMessages_DemoDocument, options);
      }
export function usePersonalMessages_DemoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PersonalMessages_DemoQuery, PersonalMessages_DemoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PersonalMessages_DemoQuery, PersonalMessages_DemoQueryVariables>(PersonalMessages_DemoDocument, options);
        }
export type PersonalMessages_DemoQueryHookResult = ReturnType<typeof usePersonalMessages_DemoQuery>;
export type PersonalMessages_DemoLazyQueryHookResult = ReturnType<typeof usePersonalMessages_DemoLazyQuery>;
export type PersonalMessages_DemoQueryResult = Apollo.QueryResult<PersonalMessages_DemoQuery, PersonalMessages_DemoQueryVariables>;
export const RequestsByPaginaIdDocument = gql`
    query RequestsByPaginaId($paginaId: String!) {
  requestsByPaginaId(paginaId: $paginaId) {
    id
    requestorId
    paginaId
    requesttext
    status
    requestor {
      username
      email
      id
    }
  }
}
    `;

/**
 * __useRequestsByPaginaIdQuery__
 *
 * To run a query within a React component, call `useRequestsByPaginaIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useRequestsByPaginaIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRequestsByPaginaIdQuery({
 *   variables: {
 *      paginaId: // value for 'paginaId'
 *   },
 * });
 */
export function useRequestsByPaginaIdQuery(baseOptions: Apollo.QueryHookOptions<RequestsByPaginaIdQuery, RequestsByPaginaIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RequestsByPaginaIdQuery, RequestsByPaginaIdQueryVariables>(RequestsByPaginaIdDocument, options);
      }
export function useRequestsByPaginaIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RequestsByPaginaIdQuery, RequestsByPaginaIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RequestsByPaginaIdQuery, RequestsByPaginaIdQueryVariables>(RequestsByPaginaIdDocument, options);
        }
export type RequestsByPaginaIdQueryHookResult = ReturnType<typeof useRequestsByPaginaIdQuery>;
export type RequestsByPaginaIdLazyQueryHookResult = ReturnType<typeof useRequestsByPaginaIdLazyQuery>;
export type RequestsByPaginaIdQueryResult = Apollo.QueryResult<RequestsByPaginaIdQuery, RequestsByPaginaIdQueryVariables>;
export const RequestsByPaginaId_DemoDocument = gql`
    query RequestsByPaginaId_Demo($paginaId: String!) {
  requestsByPaginaId_demo(paginaId: $paginaId) {
    id
    requestorId
    paginaId
    requesttext
    status
    requestor {
      username
      id
    }
  }
}
    `;

/**
 * __useRequestsByPaginaId_DemoQuery__
 *
 * To run a query within a React component, call `useRequestsByPaginaId_DemoQuery` and pass it any options that fit your needs.
 * When your component renders, `useRequestsByPaginaId_DemoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRequestsByPaginaId_DemoQuery({
 *   variables: {
 *      paginaId: // value for 'paginaId'
 *   },
 * });
 */
export function useRequestsByPaginaId_DemoQuery(baseOptions: Apollo.QueryHookOptions<RequestsByPaginaId_DemoQuery, RequestsByPaginaId_DemoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RequestsByPaginaId_DemoQuery, RequestsByPaginaId_DemoQueryVariables>(RequestsByPaginaId_DemoDocument, options);
      }
export function useRequestsByPaginaId_DemoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RequestsByPaginaId_DemoQuery, RequestsByPaginaId_DemoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RequestsByPaginaId_DemoQuery, RequestsByPaginaId_DemoQueryVariables>(RequestsByPaginaId_DemoDocument, options);
        }
export type RequestsByPaginaId_DemoQueryHookResult = ReturnType<typeof useRequestsByPaginaId_DemoQuery>;
export type RequestsByPaginaId_DemoLazyQueryHookResult = ReturnType<typeof useRequestsByPaginaId_DemoLazyQuery>;
export type RequestsByPaginaId_DemoQueryResult = Apollo.QueryResult<RequestsByPaginaId_DemoQuery, RequestsByPaginaId_DemoQueryVariables>;
export const AllPartnersDocument = gql`
    query AllPartners {
  allPartners {
    id
    userId
    username
    email
    vat_number
  }
}
    `;

/**
 * __useAllPartnersQuery__
 *
 * To run a query within a React component, call `useAllPartnersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllPartnersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllPartnersQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllPartnersQuery(baseOptions?: Apollo.QueryHookOptions<AllPartnersQuery, AllPartnersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllPartnersQuery, AllPartnersQueryVariables>(AllPartnersDocument, options);
      }
export function useAllPartnersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllPartnersQuery, AllPartnersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllPartnersQuery, AllPartnersQueryVariables>(AllPartnersDocument, options);
        }
export type AllPartnersQueryHookResult = ReturnType<typeof useAllPartnersQuery>;
export type AllPartnersLazyQueryHookResult = ReturnType<typeof useAllPartnersLazyQuery>;
export type AllPartnersQueryResult = Apollo.QueryResult<AllPartnersQuery, AllPartnersQueryVariables>;