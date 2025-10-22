import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'
import { tabBar } from './src/layouts/fg-tabbar/tabbarList'

export default defineUniPages({
  globalStyle: {
    navigationStyle: 'default',
    navigationBarTitleText: '情绪守护',
    navigationBarBackgroundColor: '#f8f8f8',
    navigationBarTextStyle: 'black',
    backgroundColor: '#FFFFFF',
  },
  // tabbar 的配置统一在 “./src/layouts/fg-tabbar/tabbarList.ts” 文件中
  tabBar: tabBar as any,
})
