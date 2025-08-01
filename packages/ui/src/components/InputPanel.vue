<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useFullscreen } from '../composables/useFullscreen'
import FullscreenDialog from './FullscreenDialog.vue'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import ActionButtonUI from './ActionButton.vue'
import { Maximize } from 'lucide-vue-next'

const { t } = useI18n()

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  selectedModel: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: ''
  },
  modelLabel: {
    type: String,
    required: true
  },
  templateLabel: {
    type: String,
    default: ''
  },
  buttonText: {
    type: String,
    required: true
  },
  loadingText: {
    type: String,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'update:selectedModel', 'submit', 'configModel'])

defineSlots<{
  'optimization-mode-selector'?: (props: {}) => any
  'model-select'?: (props: {}) => any
  'template-select'?: (props: {}) => any
  'control-buttons'?: (props: {}) => any
}>()

// 使用全屏组合函数
const { isFullscreen, fullscreenValue, openFullscreen } = useFullscreen(
  computed(() => props.modelValue),
  (value) => emit('update:modelValue', value)
)
</script>

<template>
  <div class="space-y-3">
    <!-- 标题 -->
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
      <Label class="block text-lg">{{ label }}</Label>
      <div class="flex items-center space-x-3">
        <slot name="optimization-mode-selector"></slot>
        <ActionButtonUI
          variant="outline"
          size="icon"
          @click="openFullscreen"
          :title="$t('common.expand')"
        >
          <Maximize class="h-5 w-5" />
        </ActionButtonUI>
      </div>
    </div>

    <!-- 输入框 -->
    <div class="relative">
      <Textarea
        :model-value="modelValue"
        @update:model-value="$emit('update:modelValue', $event)"
        class="w-full resize-none"
        :placeholder="placeholder"
        rows="4"
      />
    </div>

    <!-- 控制面板 -->
    <div class="flex items-center gap-2">
      <!-- 模型选择 -->
      <div class="min-w-[120px] w-fit shrink-0">
        <Label class="block text-sm mb-1.5">{{ modelLabel }}</Label>
        <slot name="model-select"></slot>
      </div>
      
      <!-- 提示词模板选择 -->
      <div v-if="templateLabel" class="flex-1 min-w-0">
        <Label class="block text-sm mb-1.5 truncate">{{ templateLabel }}</Label>
        <slot name="template-select"></slot>
      </div>

      <!-- 控制按钮组插槽 -->
      <slot name="control-buttons"></slot>

      <!-- 提交按钮 -->
      <div class="min-w-[60px]">
        <div class="h-[20px] mb-1.5"><!-- 占位，与其他元素对齐 --></div>
        <ActionButtonUI
          @click="$emit('submit')"
          :disabled="loading || disabled || !modelValue.trim()"
          :loading="loading"
          class="w-full h-10"
        >
          {{ loading ? loadingText : buttonText }}
        </ActionButtonUI>
      </div>
    </div>
  </div>
  
  <!-- 全屏弹窗 -->
  <FullscreenDialog v-model="isFullscreen" :title="label">
    <div class="h-full flex flex-col">
      <Textarea
        v-model="fullscreenValue"
        class="w-full h-full min-h-[70vh] p-4 resize-none overflow-auto flex-1"
        :placeholder="placeholder"
      />
    </div>
  </FullscreenDialog>
</template>