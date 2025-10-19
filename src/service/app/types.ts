/* eslint-disable */
// @ts-ignore

export type Article = {
  /** MongoDB ObjectId字符串，文章ID */
  id?: string;
  /** 标题，必填 */
  title: string;
  /** 描述，必填 */
  description: string;
  /** 内容 */
  content?: string;
  /** 类型，必填 */
  type: string;
  /** 标签 */
  tags?: string[];
  /** 浏览量 */
  views?: number;
  /** 点赞数 */
  likes?: number;
  /** 评论数 */
  comments?: number;
  /** 收藏数 */
  stars?: number;
  /** 时长（秒） */
  duration?: number;
  /** 阅读时间（分钟） */
  read_time?: number;
  /** 视频链接 */
  video_url?: string;
  /** 封面图片 */
  cover_image?: string;
  /** 状态，默认 draft */
  status?: string;
  /** 作者ID，关联 UserProfile */
  author: string;
  /** 发布时间 */
  publish_time?: string;
  /** 创建时间 */
  createdAt?: string;
  /** 更新时间 */
  updatedAt?: string;
};

export type deleteApiScaleResultsIdParams = {
  /** 量表结果ID */
  id: string;
};

export type deleteArticlesIdParams = {
  /** 文章ID */
  id: string;
};

export type deleteHealthReportsIdParams = {
  /** 健康报告ID */
  id: string;
};

export type deleteMoodJournalsIdParams = {
  /** 心情日记ID */
  id: string;
};

export enum GenderEnum {
  'NUMBER_0' = 0,
  'NUMBER_1' = 1,
  'NUMBER_2' = 2,
}

export type IGenderEnum = keyof typeof GenderEnum;

export type getApiScaleResults_openAPI_exportParams = {
  /** 用户ID列表 */
  userIds?: string[];
  /** 量表ID */
  scaleId: string;
  /** 筛选条件 */
  filters?: Record<string, unknown>;
  /** 导出格式 */
  format?: 'csv' | 'xlsx';
};

export type getApiScaleResultsIdParams = {
  /** 量表结果ID */
  id: string;
};

export type getApiScaleResultsParams = {
  /** 页码 */
  page?: number;
  /** 每页数量 */
  pageSize?: number;
};

export type getArticlesIdParams = {
  /** 文章ID */
  id: string;
};

export type getHealthReportsIdParams = {
  /** 健康报告ID */
  id: string;
};

export type getMoodJournalsDateRangeParams = {
  /** 用户ID */
  user_id: string;
  /** 开始日期 yyyy-MM-dd */
  start_date: string;
  /** 结束日期 yyyy-MM-dd */
  end_date: string;
  /** 页码 */
  page?: number;
  /** 每页数量 */
  pageSize?: number;
};

export type getMoodJournalsIdDetailParams = {
  /** 心情日记ID */
  id: string;
};

export type getMoodJournalsPaginationParams = {
  /** 用户ID */
  user_id: string;
  /** 页码 */
  page?: number;
  /** 每页数量 */
  pageSize?: number;
};

export type getScaleConfigsIdParams = {
  /** 量表配置ID */
  id: string;
};

export type getScaleConfigsParams = {
  /** 页码 */
  page?: number;
  /** 每页数量 */
  pageSize?: number;
};

export type getUserListParams = {
  /** 页码 */
  page?: number;
  /** 每页数量 */
  pageSize?: number;
};

export type getUserProfileParams = {
  /** 用户ID */
  user_id: string;
};

export type HealthReport = {
  /** 健康报告ID */
  id: string;
  /** 用户ID */
  user_id: string;
  /** 评估ID */
  assessment_id: string;
  /** 报告类型 */
  report_type: string;
  /** 总体风险 */
  overall_risk?: string;
  /** 总结 */
  summary?: string;
  /** 建议 */
  recommendations?: string[];
  /** 专业建议 */
  professional_advice?: string;
  /** 趋势分析 */
  trend_analysis?: string;
  /** 趋势数据 */
  trend_data?: Record<string, unknown>;
  /** 创建时间 */
  createdAt?: string;
  /** 更新时间 */
  updatedAt?: string;
};

export enum Marital_statusEnum {
  未婚 = '未婚',
  已婚 = '已婚',
  离异 = '离异',
  丧偶 = '丧偶',
  其他 = '其他',
}

export type IMarital_statusEnum = keyof typeof Marital_statusEnum;

export type MoodJournal = {
  /** MongoDB ObjectId字符串，心情日记ID */
  id?: string;
  /** 用户ID */
  user_id: string;
  /** 心情分数，范围 1-10 */
  mood_score: number;
  /** 心情名称 */
  mood_name?: string;
  /** 表情 */
  mood_emoji?: string;
  /** 心情描述 */
  text?: string;
  /** 日期，格式 yyyy-MM-dd */
  date_key: string;
  /** 创建时间 */
  createdAt?: string;
  /** 更新时间 */
  updatedAt?: string;
};

export type PersonalInfo = {
  /** 真实姓名 */
  real_name?: string;
  /** 性别 (0=未知, 1=男, 2=女) */
  gender?: 0 | 1 | 2;
  /** 出生年份 */
  birth_year?: number;
  /** 职业 */
  occupation?: string;
  /** 学历 */
  education?: string;
  /** 婚姻状况 */
  marital_status?: '未婚' | '已婚' | '离异' | '丧偶' | '其他';
  /** 民族 */
  ethnicity?: string;
  /** 宗教信仰 */
  religion?: string;
  /** 收入水平 */
  income_level?: string;
  /** 医保类型 */
  insurance_type?: string;
  /** 家庭结构 */
  family_structure?: string;
  /** 身高 (cm) */
  height?: number;
  /** 体重 (kg) */
  weight?: number;
  /** 慢性病史 */
  chronic_disease?: string[];
  /** 是否吸烟 */
  smoking?: boolean;
  /** 是否饮酒 */
  drinking?: boolean;
  /** 地区 */
  location?: string;
};

export type ScaleConfig = {
  /** MongoDB ObjectId字符串，量表配置ID */
  id: string;
  /** 量表名称，必填 */
  name: string;
  /** 量表编码，必填，唯一 */
  code: string;
  /** 描述 */
  description?: string;
  /** 量表类型，必填 */
  type: string;
  /** 题目列表 */
  questions?: {
    id: string;
    title: string;
    type: 'single' | 'multiple' | 'custom';
    options?: { label: string; value: string }[];
    required?: boolean;
    placeholder?: string;
  }[];
  /** 版本号，默认 1.0 */
  version?: string;
  /** 状态，枚举：draft、active、archived，默认 draft */
  status?: 'draft' | 'active' | 'archived';
  /** 创建时间 */
  createdAt?: string;
  /** 更新时间 */
  updatedAt?: string;
};

export type ScaleResult = {
  /** MongoDB ObjectId字符串，量表结果ID */
  id: string;
  /** 用户ID，关联 UserProfile */
  user_id: string;
  /** 用户快照信息 */
  personal_info_shot?: Record<string, unknown>;
  /** 量表编码，必填 */
  scale_code: string;
  /** 量表标题 */
  scale_title?: string;
  /** 量表版本 */
  scale_version?: string;
  /** 答案选项列表 */
  selectedOptions?: {
    questionId?: string;
    optionText?: string;
    optionOrder?: string;
  }[];
  /** 结论 */
  conclusion?: string;
  /** 评估类型 */
  assessment_type?: string;
  /** 答题耗时（毫秒） */
  duration_ms?: number;
  /** 开始时间 */
  started_at?: string;
  /** 完成时间 */
  completed_at?: string;
  /** 状态，枚举：completed、in_progress、invalid */
  status?: 'completed' | 'in_progress' | 'invalid';
  /** 创建时间 */
  createdAt?: string;
  /** 更新时间 */
  updatedAt?: string;
};

export type ScaleResultRequest = {
  /** 用户ID */
  user_id: string;
  /** 问卷类型 */
  questionnaire_type: string;
  /** 得分 */
  score: number;
  /** 等级 */
  level: string;
  /** 答题详情 */
  answers?: Record<string, unknown>[];
  /** 每题选项编号和文本 */
  answerDetails?: {
    questionId: string;
    optionId: string;
    optionText: string;
  }[];
  /** 题目详情 */
  questions?: Record<string, unknown>[];
  /** 状态 */
  status?: string;
};

export enum StatusEnum {
  draft = 'draft',
  active = 'active',
  archived = 'archived',
}

export type IStatusEnum = keyof typeof StatusEnum;

export enum StatusEnum2 {
  completed = 'completed',
  in_progress = 'in_progress',
  invalid = 'invalid',
}

export type IStatusEnum2 = keyof typeof StatusEnum2;

export type UserProfile = {
  /** MongoDB ObjectId字符串，用户资料ID */
  id: string;
  /** MongoDB ObjectId字符串，用户唯一标识ID，必填，唯一索引 */
  user_id: string;
  personal_info?: PersonalInfo;
  /** 手机号，唯一索引，sparse，正则 /^1\d{10}$/ */
  mobile?: string;
  /** 首次登录时间 */
  first_login?: string;
  /** 最近登录时间 */
  last_login?: string;
  /** 创建时间 */
  createdAt?: string;
  /** 更新时间 */
  updatedAt?: string;
};
