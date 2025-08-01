<template>
  <div class="h-screen flex flex-col min-h-0 bg-background text-foreground transition-colors duration-300">
    <!-- 顶部导航栏 -->
    <header class="flex-none border-b border-border bg-card">
      <div class="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 class="text-xl font-bold text-foreground flex items-center gap-2">
          <slot name="title">{{ t('common.appName') }}</slot>
        </h1>
        <div class="flex items-center gap-3">
          <slot name="actions"></slot>
        </div>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="flex-1 min-h-0 container mx-auto p-4">
      <div class="flex flex-col lg:flex-row gap-4 h-full">
        <slot></slot>
      </div>
    </main>

    <!-- 弹窗插槽 -->
    <slot name="modals"></slot>

    <!-- 全局提示 -->
    <ToastUI />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ToastUI } from '../index'

const { t } = useI18n()
</script>

<style>
/* Custom styles are no longer needed as we are using Tailwind utility classes. */
</style>