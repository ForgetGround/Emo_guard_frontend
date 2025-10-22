<route lang="json5">
{
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '我的',
  },
}
</route>

<script setup lang="ts">
import type { app_api_userProfileApi_UserProfileResponse } from '@/service/app/types'
import { useQuery } from '@tanstack/vue-query'
import { getUserCompleteInfoUserProfileGetQueryOptions } from '@/service/app/userProfile.vuequery'
// 获取用户档案信息（接口返回类型为 UserBaseInfoResponse，需兼容 profile 字段）
const { data: userInfo, isLoading } = useQuery(
  getUserCompleteInfoUserProfileGetQueryOptions({ params: {} }),
)
const profile: app_api_userProfileApi_UserProfileResponse | undefined =
  userInfo && 'profile' in userInfo ? (userInfo.profile as app_api_userProfileApi_UserProfileResponse) : undefined

onShow(() => {
  console.log('个人中心页面显示')
})
</script>

<template>
  <wot-page>
    <wd-navbar title="个人中心" />
    <wd-card title="个人档案">
      <template #desc>
        <wot-loading v-if="isLoading" />
        <wd-list v-else>
          <wd-list-item title="昵称" :desc="profile?.nickname" />
          <wd-list-item title="真实姓名" :desc="profile?.real_name" />
          <wd-list-item
            title="性别"
            :desc="profile?.gender === 1 ? '男' : profile?.gender === 2 ? '女' : '未知'"
          />
          <wd-list-item title="出生日期" :desc="profile?.birth_date ?? '未填写'" />
          <wd-list-item title="职业" :desc="profile?.occupation ?? '未填写'" />
          <wd-list-item title="学历" :desc="profile?.education ?? '未填写'" />
          <wd-list-item title="婚姻状况" :desc="profile?.marital_status ?? '未填写'" />
          <wd-list-item title="手机" :desc="profile?.mobile ?? '未填写'" />
          <wd-list-item
            title="身高"
            :desc="profile?.height ? `${profile.height}cm` : '未填写'"
          />
          <wd-list-item
            title="体重"
            :desc="profile?.weight ? `${profile.weight}kg` : '未填写'"
          />
          <wd-list-item title="所在地" :desc="profile?.location ?? '未填写'" />
          <wd-list-item
            title="慢性病"
            :desc="profile?.chronic_diseases?.length ? profile.chronic_diseases.join(', ') : '无'"
          />
          <wd-list-item title="吸烟" :desc="profile?.smoking ? '是' : '否'" />
          <wd-list-item title="饮酒" :desc="profile?.drinking ? '是' : '否'" />
        </wd-list>
      </template>
    </wd-card>
    <wd-card title="系统消息">
      <template #desc>
        <wd-list>
          <wd-list-item title="暂无消息" desc="" />
        </wd-list>
      </template>
    </wd-card>
    <wd-card title="意见反馈">
      <template #desc>
        <wd-list>
          <wd-list-item title="提交反馈" desc="" />
        </wd-list>
      </template>
    </wd-card>
    <wd-card title="设置">
      <template #desc>
        <wd-list>
          <wd-list-item title="通用设置" desc="" />
        </wd-list>
      </template>
    </wd-card>
    <wd-card title="账号安全">
      <template #desc>
        <wd-list>
          <wd-list-item title="修改密码" desc="" />
        </wd-list>
      </template>
    </wd-card>
  </wot-page>
</template>
