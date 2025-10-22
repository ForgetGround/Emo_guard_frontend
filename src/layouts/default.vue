<script lang="ts" setup>
import type { ConfigProviderThemeVars } from 'wot-design-uni'

const themeVars: ConfigProviderThemeVars = {
  colorTheme: '#007aff',
  buttonPrimaryBgColor: '#007aff',
  buttonPrimaryColor: '#fff',
  buttonSuccessBgColor: '#4cd964',
  buttonWarningBgColor: '#f0ad4e',
  buttonErrorBgColor: '#dd524d'
}
</script>

<template>
  <wd-config-provider :theme-vars="themeVars">
    <slot />
    <wd-toast />
    <wd-message-box />
  </wd-config-provider>
</template>
