/* eslint-disable */
// @ts-ignore

export type ArticleCreate = {
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

export type ArticleUpdate = {
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

export type AuthResponse = {
  /** Id */
  id: number;
  /** Username */
  username: string | null;
  registration_type: RegistrationType;
  /** Token */
  token: string;
};

export type checkAccessTokenWechatAuthGetParams = {
  access_token: string;
  openid: string;
};

export type deleteArticleArticlesArticleIdDeleteParams = {
  article_id: number;
};

export type deleteHealthReportHealthReportsHealthReportIdDeleteParams = {
  health_report_id: number;
};

export type deleteMoodJournalMoodJournalsMoodJournalIdDeleteParams = {
  mood_journal_id: number;
};

export type deleteResultResultsResultIdDeleteParams = {
  result_id: number;
};

export type deleteScaleConfigScalesScaleConfigIdDeleteParams = {
  scale_config_id: number;
};

export type deleteUserUsersUserIdDeleteParams = {
  user_id: number;
};

export type getAccessTokenWechatAccessTokenPostParams = {
  code: string;
};

export type getArticleArticlesArticleIdGetParams = {
  article_id: number;
};

export type getHealthReportHealthReportsHealthReportIdGetParams = {
  health_report_id: number;
};

export type getMoodJournalMoodJournalsMoodJournalIdGetParams = {
  mood_journal_id: number;
};

export type getResultResultsResultIdGetParams = {
  result_id: number;
};

export type getScaleConfigScalesScaleConfigIdGetParams = {
  scale_config_id: number;
};

export type getUserinfoWechatUserinfoGetParams = {
  access_token: string;
  openid: string;
};

export type getUserUsersUserIdGetParams = {
  user_id: number;
};

export type HealthReportCreate = {
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

export type HealthReportUpdate = {
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
};

export type listHealthReportsHealthReportsGetParams = {
  skip?: number;
  limit?: number;
};

export type listMoodJournalsMoodJournalsGetParams = {
  skip?: number;
  limit?: number;
};

export type listResultsResultsGetParams = {
  skip?: number;
  limit?: number;
};

export type listScaleConfigsScalesGetParams = {
  skip?: number;
  limit?: number;
};

export type listUsersUsersGetParams = {
  skip?: number;
  limit?: number;
};

export type loginAuthLoginPostParams = {
  username?: string | null;
  password?: string | null;
};

export type MoodJournalCreate = {
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

export type MoodJournalUpdate = {
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

export type refreshAccessTokenWechatRefreshTokenPostParams = {
  refresh_token: string;
};

export type registerAuthRegisterPostParams = {
  username?: string | null;
  password?: string | null;
  nickname?: string | null;
  avatar?: string | null;
};

export enum RegistrationType {
  manual = 'manual',
  wechat = 'wechat',
  admin = 'admin',
}

export type IRegistrationType = keyof typeof RegistrationType;

export type ScaleConfigCreate = {
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
  questions?: Record<string, unknown>[] | null;
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
  questions?: Record<string, unknown>[] | null;
  /** Status */
  status: string;
  /** Created At */
  created_at: string;
  /** Updated At */
  updated_at: string;
};

export type ScaleConfigUpdate = {
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
  questions?: Record<string, unknown>[] | null;
  /** Status */
  status?: string | null;
};

export type ScaleResultCreate = {
  /** Scale Config Id */
  scale_config_id: number;
  /** Selected Options */
  selected_options?: Record<string, unknown>[] | null;
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

export type ScaleResultResponse = {
  /** Id */
  id: number;
  /** User Id */
  user_id: number;
  /** Scale Config Id */
  scale_config_id: number;
  /** Selected Options */
  selected_options?: Record<string, unknown>[] | null;
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
  selected_options?: Record<string, unknown>[] | null;
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

export type updateArticleArticlesArticleIdPutParams = {
  article_id: number;
};

export type updateHealthReportHealthReportsHealthReportIdPutParams = {
  health_report_id: number;
};

export type updateMoodJournalMoodJournalsMoodJournalIdPutParams = {
  mood_journal_id: number;
};

export type updateResultResultsResultIdPutParams = {
  result_id: number;
};

export type updateScaleConfigScalesScaleConfigIdPutParams = {
  scale_config_id: number;
};

export type updateUserUsersUserIdPutParams = {
  user_id: number;
};

export type UserCreate = {
  /** Username */
  username?: string | null;
  /** Password Hash */
  password_hash?: string | null;
  /** Salt */
  salt?: string | null;
  /** Wechat Openid */
  wechat_openid?: string | null;
  /** Wechat Unionid */
  wechat_unionid?: string | null;
  /** Wechat Nickname */
  wechat_nickname?: string | null;
  /** Wechat Avatar */
  wechat_avatar?: string | null;
  role?: UserRole;
  registration_type?: RegistrationType;
  /** Is Admin */
  is_admin?: boolean;
  /** Is Active */
  is_active?: boolean;
};

export type UserResponse = {
  /** Id */
  id: number;
  /** Username */
  username?: string | null;
  /** Wechat Openid */
  wechat_openid?: string | null;
  /** Wechat Unionid */
  wechat_unionid?: string | null;
  /** Wechat Nickname */
  wechat_nickname?: string | null;
  /** Wechat Avatar */
  wechat_avatar?: string | null;
  role: UserRole;
  registration_type: RegistrationType;
  /** Is Admin */
  is_admin: boolean;
  /** Is Active */
  is_active: boolean;
  /** Last Login */
  last_login?: string | null;
  /** Created At */
  created_at: string;
  /** Updated At */
  updated_at: string;
};

export enum UserRole {
  user = 'user',
  admin = 'admin',
  therapist = 'therapist',
}

export type IUserRole = keyof typeof UserRole;

export type UserUpdate = {
  /** Username */
  username?: string | null;
  /** Password Hash */
  password_hash?: string | null;
  /** Salt */
  salt?: string | null;
  /** Wechat Openid */
  wechat_openid?: string | null;
  /** Wechat Unionid */
  wechat_unionid?: string | null;
  /** Wechat Nickname */
  wechat_nickname?: string | null;
  /** Wechat Avatar */
  wechat_avatar?: string | null;
  role?: UserRole | null;
  registration_type?: RegistrationType | null;
  /** Is Admin */
  is_admin?: boolean | null;
  /** Is Active */
  is_active?: boolean | null;
  /** Last Login */
  last_login?: string | null;
};

export type ValidationError = {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
};
