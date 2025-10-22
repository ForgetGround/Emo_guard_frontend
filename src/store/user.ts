import type { UserLoginResponse } from '@/service/app/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import {
  useUserPasswordLoginAuthUserLoginPasswordPostMutation,
  useUserRegisterAuthUserRegisterPostMutation,
} from '@/service/app/auth.vuequery'

const defaultUser: UserLoginResponse = {
  user_id: 0,
  access_token: '',
}

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<UserLoginResponse>({ ...defaultUser })
    const isLogined = computed(() => !!userInfo.value.access_token)

    // 持久化
    const persist = {
      enabled: true,
      strategies: [
        {
          key: 'user',
          storage: uni,
        },
      ],
    }

    // 设置用户信息
    function setUserInfo(val: UserLoginResponse) {
      userInfo.value = { ...userInfo.value, ...val }
      uni.setStorageSync('userInfo', userInfo.value)
      uni.setStorageSync('token', userInfo.value.access_token)
    }

    // 清除用户信息
    function clearUserInfo() {
      userInfo.value = { ...defaultUser }
      uni.removeStorageSync('userInfo')
      uni.removeStorageSync('token')
    }

    // 登录（账号密码）
    async function login({ username, password }: { username: string; password: string }) {
      const mutation = useUserPasswordLoginAuthUserLoginPasswordPostMutation()
      const res = await mutation.mutateAsync({ body: { username, password } })
      if (res?.access_token) {
        setUserInfo(res)
      }
      return res
    }

    // 注册
    async function register({ username, password }: { username: string; password: string }) {
      const mutation = useUserRegisterAuthUserRegisterPostMutation()
      const res = await mutation.mutateAsync({ body: { username, password } })
      return res
    }

    return {
      userInfo,
      isLogined,
      setUserInfo,
      clearUserInfo,
      login,
      register,
    }
  },
  {
    persist: true,
  },
)
