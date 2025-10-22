/* eslint-disable */
// @ts-ignore

export type AdminInfoResponse = {
  /** Admin Id */
  admin_id: number;
  /** Username */
  username: string;
  /** Role */
  role?: string;
};

export type AdminLoginRequest = {
  /** Username */
  username: string;
  /** Password */
  password: string;
};

export type AdminLoginResponse = {
  /** Access Token */
  access_token: string;
  /** Token Type */
  token_type?: string;
  /** Admin Id */
  admin_id: number;
  /** Role */
  role?: string;
};

export type app_api_userApi_UserProfileResponse = {
  /** Id */
  id: number;
  /** Nickname */
  nickname: string;
  /** Real Name */
  real_name: string;
  /** Gender */
  gender: number;
  /** Birth Date */
  birth_date?: string | null;
  /** Occupation */
  occupation?: string | null;
  /** Education */
  education?: string | null;
  /** Marital Status */
  marital_status: string;
  /** Mobile */
  mobile?: string | null;
  /** Created At */
  created_at: string;
  /** Updated At */
  updated_at: string;
};

export type app_api_userProfileApi_UserProfileResponse = {
  /** Id */
  id: number;
  /** Nickname */
  nickname: string;
  /** Real Name */
  real_name: string;
  /** Gender */
  gender: number;
  /** Birth Date */
  birth_date?: string | null;
  /** Occupation */
  occupation?: string | null;
  /** Education */
  education?: string | null;
  /** Marital Status */
  marital_status: string;
  /** Mobile */
  mobile?: string | null;
  /** Height */
  height?: number | null;
  /** Weight */
  weight?: number | null;
  /** Location */
  location?: string | null;
  /** Chronic Diseases */
  chronic_diseases?: unknown[] | null;
  /** Smoking */
  smoking: boolean;
  /** Drinking */
  drinking: boolean;
  /** Created At */
  created_at: string;
  /** Updated At */
  updated_at: string;
};

export type ArticleCreateRequest = {
  /** Title */
  title: string;
  /** Content */
  content?: string | null;
  /** Cover Image */
  cover_image?: string | null;
  /** Publish Time */
  publish_time?: string | null;
  /** Status */
  status?: string;
};

export type ArticleResponse = {
  /** Id */
  id: number;
  /** Title */
  title: string;
  /** Content */
  content?: string | null;
  /** Cover Image */
  cover_image?: string | null;
  /** Publish Time */
  publish_time?: string | null;
  /** Status */
  status: string;
  /** Created At */
  created_at: string;
  /** Updated At */
  updated_at: string;
};

export type ArticleUpdateRequest = {
  /** Title */
  title?: string | null;
  /** Content */
  content?: string | null;
  /** Cover Image */
  cover_image?: string | null;
  /** Publish Time */
  publish_time?: string | null;
  /** Status */
  status?: string | null;
};

export type checkWechatTokenAuthWechatCheckTokenPostParams = {
  role?: string;
};

export type createHealthReportHealthReportsPostParams = {
  role?: string;
};

export type createMoodJournalMoodJournalsPostParams = {
  role?: string;
};

export type createResultResultsPostParams = {
  role?: string;
};

export type deleteArticleArticlesArticleIdDeleteParams = {
  article_id: number;
};

export type deleteHealthReportHealthReportsHealthReportIdDeleteParams = {
  health_report_id: number;
  role?: string;
};

export type deleteMoodJournalMoodJournalsMoodJournalIdDeleteParams = {
  mood_journal_id: number;
  role?: string;
};

export type deleteResultResultsResultIdDeleteParams = {
  result_id: number;
  role?: string;
};

export type deleteScaleConfigScalesScaleConfigIdDeleteParams = {
  scale_config_id: number;
};

export type deleteUserAdminUsersUserIdDeleteParams = {
  user_id: number;
};

export type getArticleArticlesArticleIdGetParams = {
  article_id: number;
  role?: string;
};

export type getCurrentUserInfoAuthUserMeGetParams = {
  role?: string;
};

export type getHealthReportHealthReportsHealthReportIdGetParams = {
  health_report_id: number;
  role?: string;
};

export type getMoodJournalMoodJournalsMoodJournalIdGetParams = {
  mood_journal_id: number;
  role?: string;
};

export type getResultResultsResultIdGetParams = {
  result_id: number;
  role?: string;
};

export type getScaleConfigScalesScaleConfigIdGetParams = {
  scale_config_id: number;
  role?: string;
};

export type getUserCompleteInfoUserProfileGetParams = {
  role?: string;
};

export type getUserDetailAdminUsersUserIdGetParams = {
  user_id: number;
};

export type getWechatSessionAuthWechatSessionPostParams = {
  role?: string;
};

export type getWechatUserinfoAuthWechatUserinfoPostParams = {
  role?: string;
};

export type HealthCheckResponse = {
  /** Status */
  status: string;
  /** Project */
  project: string;
  /** Version */
  version: string;
};

export type HealthReportCreateRequest = {
  /** User Id */
  user_id: number;
  /** Assessment Id */
  assessment_id: number;
  /** Report Type */
  report_type: string;
  /** Overall Risk */
  overall_risk?: string | null;
  /** Summary */
  summary?: string | null;
  /** Recommendations */
  recommendations?: string[] | null;
  /** Professional Advice */
  professional_advice?: string | null;
  /** Trend Analysis */
  trend_analysis?: string | null;
  /** Trend Data */
  trend_data?: Record<string, unknown> | null;
};

export type HealthReportResponse = {
  /** Id */
  id: number;
  /** User Id */
  user_id: number;
  /** Assessment Id */
  assessment_id: number;
  /** Report Type */
  report_type: string;
  /** Overall Risk */
  overall_risk?: string | null;
  /** Summary */
  summary?: string | null;
  /** Recommendations */
  recommendations?: string[] | null;
  /** Professional Advice */
  professional_advice?: string | null;
  /** Trend Analysis */
  trend_analysis?: string | null;
  /** Trend Data */
  trend_data?: Record<string, unknown> | null;
  /** Created At */
  created_at: string;
  /** Updated At */
  updated_at: string;
};

export type HealthReportUpdateRequest = {
  /** User Id */
  user_id?: number | null;
  /** Assessment Id */
  assessment_id?: number | null;
  /** Report Type */
  report_type?: string | null;
  /** Overall Risk */
  overall_risk?: string | null;
  /** Summary */
  summary?: string | null;
  /** Recommendations */
  recommendations?: string[] | null;
  /** Professional Advice */
  professional_advice?: string | null;
  /** Trend Analysis */
  trend_analysis?: string | null;
  /** Trend Data */
  trend_data?: Record<string, unknown> | null;
};

export type HTTPValidationError = {
  /** Detail */
  detail?: ValidationError[];
};

export type listArticlesArticlesGetParams = {
  skip?: number;
  limit?: number;
  role?: string;
};

export type listHealthReportsHealthReportsGetParams = {
  skip?: number;
  limit?: number;
  role?: string;
};

export type listMoodJournalsMoodJournalsGetParams = {
  skip?: number;
  limit?: number;
  role?: string;
};

export type listResultsResultsGetParams = {
  skip?: number;
  limit?: number;
  role?: string;
};

export type listScaleConfigsScalesGetParams = {
  skip?: number;
  limit?: number;
  role?: string;
};

export type listUsersAdminUsersGetParams = {
  skip?: number;
  limit?: number;
};

export type MoodJournalCreateRequest = {
  /** User Id */
  user_id: number;
  /** Mood Score */
  mood_score: number;
  /** Mood Name */
  mood_name?: string | null;
  /** Mood Emoji */
  mood_emoji?: string | null;
  /** Text */
  text?: string | null;
  /** Record Date */
  record_date: string;
};

export type MoodJournalResponse = {
  /** Id */
  id: number;
  /** User Id */
  user_id: number;
  /** Mood Score */
  mood_score: number;
  /** Mood Name */
  mood_name?: string | null;
  /** Mood Emoji */
  mood_emoji?: string | null;
  /** Text */
  text?: string | null;
  /** Record Date */
  record_date: string;
  /** Created At */
  created_at: string;
  /** Updated At */
  updated_at: string;
};

export type MoodJournalUpdateRequest = {
  /** User Id */
  user_id?: number | null;
  /** Mood Score */
  mood_score?: number | null;
  /** Mood Name */
  mood_name?: string | null;
  /** Mood Emoji */
  mood_emoji?: string | null;
  /** Text */
  text?: string | null;
  /** Record Date */
  record_date?: string | null;
};

export type Question = {
  /** Text */
  text: string;
  /** Options */
  options?: QuestionOption[] | null;
};

export type QuestionOption = {
  /** Label */
  label: string;
  /** Value */
  value: string;
};

export type refreshWechatTokenAuthWechatRefreshTokenPostParams = {
  role?: string;
};

export type RootResponse = {
  /** Message */
  message: string;
  /** Version */
  version: string;
  /** Docs */
  docs: string;
  /** Health */
  health: string;
};

export type ScaleConfigCreateRequest = {
  /** Name */
  name: string;
  /** Code */
  code: string;
  /** Version */
  version?: string;
  /** Description */
  description?: string | null;
  /** Type */
  type: string;
  /** Questions */
  questions?: Question[] | null;
  /** Status */
  status?: string;
};

export type ScaleConfigResponse = {
  /** Id */
  id: number;
  /** Name */
  name: string;
  /** Code */
  code: string;
  /** Version */
  version: string;
  /** Description */
  description?: string | null;
  /** Type */
  type: string;
  /** Questions */
  questions?: Question[] | null;
  /** Status */
  status: string;
  /** Created At */
  created_at: string;
  /** Updated At */
  updated_at: string;
};

export type ScaleConfigUpdateRequest = {
  /** Name */
  name?: string | null;
  /** Code */
  code?: string | null;
  /** Version */
  version?: string | null;
  /** Description */
  description?: string | null;
  /** Type */
  type?: string | null;
  /** Questions */
  questions?: Question[] | null;
  /** Status */
  status?: string | null;
};

export type ScaleResultCreate = {
  /** Scale Config Id */
  scale_config_id: number;
  /** Selected Options */
  selected_options?: SelectedOption[] | null;
  /** Conclusion */
  conclusion?: string | null;
  /** Duration Ms */
  duration_ms?: number | null;
  /** Started At */
  started_at?: string | null;
  /** Completed At */
  completed_at?: string | null;
  /** Status */
  status?: string | null;
};

export type ScaleResultDeleteResponse = {
  /** Success */
  success: boolean;
};

export type ScaleResultResponse = {
  /** Id */
  id: number;
  /** User Id */
  user_id: number;
  /** Scale Config Id */
  scale_config_id: number;
  /** Selected Options */
  selected_options?: SelectedOption[] | null;
  /** Conclusion */
  conclusion?: string | null;
  /** Duration Ms */
  duration_ms?: number | null;
  /** Started At */
  started_at?: string | null;
  /** Completed At */
  completed_at: string;
  /** Status */
  status: string;
  /** Created At */
  created_at: string;
  /** Updated At */
  updated_at: string;
};

export type ScaleResultUpdate = {
  /** Selected Options */
  selected_options?: SelectedOption[] | null;
  /** Conclusion */
  conclusion?: string | null;
  /** Duration Ms */
  duration_ms?: number | null;
  /** Started At */
  started_at?: string | null;
  /** Completed At */
  completed_at?: string | null;
  /** Status */
  status?: string | null;
};

export type SelectedOption = {
  /** Option Text */
  option_text: string;
  /** Option Value */
  option_value: string;
};

export type updateArticleArticlesArticleIdPutParams = {
  article_id: number;
};

export type updateHealthReportHealthReportsHealthReportIdPutParams = {
  health_report_id: number;
  role?: string;
};

export type updateMoodJournalMoodJournalsMoodJournalIdPutParams = {
  mood_journal_id: number;
  role?: string;
};

export type updateResultResultsResultIdPutParams = {
  result_id: number;
  role?: string;
};

export type updateScaleConfigScalesScaleConfigIdPutParams = {
  scale_config_id: number;
};

export type updateUserAdminUsersUserIdPutParams = {
  user_id: number;
};

export type updateUserProfileUserProfilePutParams = {
  role?: string;
};

export type UserBaseInfoResponse = {
  /** User Id */
  user_id: number;
  /** Wx Openid */
  wx_openid?: string | null;
  /** Login Method */
  login_method: string;
  /** Created At */
  created_at: string;
  profile: app_api_userProfileApi_UserProfileResponse;
};

export type UserCreateRequest = {
  /** Wx Openid */
  wx_openid?: string | null;
  /** Wx Unionid */
  wx_unionid?: string | null;
  /** Phone */
  phone?: string | null;
  /** Password */
  password?: string | null;
  /** Nickname */
  nickname?: string;
  /** Real Name */
  real_name?: string;
};

export type UserCreateResponse = {
  /** User Id */
  user_id: number;
  /** Message */
  message?: string;
};

export type UserDeleteResponse = {
  /** Success */
  success: boolean;
  /** Message */
  message: string;
};

export type UserInfoResponse = {
  /** User Id */
  user_id: number;
  /** Username */
  username?: string | null;
  /** Wx Openid */
  wx_openid?: string | null;
  /** Login Method */
  login_method: string;
  /** Created At */
  created_at: string;
  /** Nickname */
  nickname?: string | null;
  /** Real Name */
  real_name?: string | null;
};

export type UserListResponse = {
  /** Total */
  total: number;
  /** Users */
  users: UserResponse[];
};

export type UserLoginResponse = {
  /** Access Token */
  access_token: string;
  /** Token Type */
  token_type?: string;
  /** User Id */
  user_id: number;
  /** Role */
  role?: string;
};

export type UserPasswordLoginRequest = {
  /** Username */
  username: string;
  /** Password */
  password: string;
};

export type UserProfileUpdateRequest = {
  /** Nickname */
  nickname?: string | null;
  /** Real Name */
  real_name?: string | null;
  /** Gender */
  gender?: number | null;
  /** Birth Date */
  birth_date?: string | null;
  /** Occupation */
  occupation?: string | null;
  /** Education */
  education?: string | null;
  /** Marital Status */
  marital_status?: string | null;
  /** Mobile */
  mobile?: string | null;
  /** Height */
  height?: number | null;
  /** Weight */
  weight?: number | null;
  /** Location */
  location?: string | null;
  /** Chronic Diseases */
  chronic_diseases?: unknown[] | null;
  /** Smoking */
  smoking?: boolean | null;
  /** Drinking */
  drinking?: boolean | null;
};

export type UserRegisterRequest = {
  /** Username */
  username: string;
  /** Password */
  password: string;
  /** Nickname */
  nickname?: string | null;
  /** Real Name */
  real_name?: string | null;
};

export type UserRegisterResponse = {
  /** User Id */
  user_id: number;
  /** Username */
  username: string;
  /** Message */
  message?: string;
};

export type UserResponse = {
  /** Id */
  id: number;
  /** Wx Openid */
  wx_openid?: string | null;
  /** Wx Unionid */
  wx_unionid?: string | null;
  /** Login Method */
  login_method: string;
  /** Created At */
  created_at: string;
  profile?: app_api_userApi_UserProfileResponse | null;
};

export type UserUpdateRequest = {
  /** Wx Openid */
  wx_openid?: string | null;
  /** Wx Unionid */
  wx_unionid?: string | null;
  /** Login Method */
  login_method?: string | null;
};

export type UserWeChatLoginRequest = {
  /** Code */
  code: string;
};

export type ValidationError = {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
};

export type WeChatCheckTokenRequest = {
  /** Access Token */
  access_token: string;
  /** Openid */
  openid: string;
};

export type WeChatCheckTokenResponse = {
  /** Valid */
  valid: boolean;
};

export type WeChatRefreshTokenRequest = {
  /** Refresh Token */
  refresh_token: string;
};

export type WeChatRefreshTokenResponse = {
  /** Access Token */
  access_token: string;
  /** Expires In */
  expires_in: number;
};

export type WeChatSessionResponse = {
  /** Openid */
  openid: string;
  /** Session Key */
  session_key: string;
};

export type WeChatUserInfoRequest = {
  /** Access Token */
  access_token: string;
  /** Openid */
  openid: string;
};

export type WeChatUserInfoResponse = {
  /** Openid */
  openid: string;
  /** Nickname */
  nickname?: string | null;
  /** Avatar */
  avatar?: string | null;
  /** Gender */
  gender?: number | null;
};
