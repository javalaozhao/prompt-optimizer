<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { OptimizationMode } from '@prompt-optimizer/core'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

const { t } = useI18n()

interface Props {
  modelValue: OptimizationMode
}

interface Emits {
  (e: 'update:modelValue', value: OptimizationMode): void
  (e: 'change', value: OptimizationMode): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

function handleValueChange(value: string) {
  if (value && value !== props.modelValue) {
    const newMode = value as OptimizationMode
    emit('update:modelValue', newMode)
    emit('change', newMode)
  }
}
</script>

<template>
  <ToggleGroup
    type="single"
    :model-value="modelValue"
    class="inline-flex rounded theme-border-strong text-[10px]"
    @update:model-value="handleValueChange"
  >
    <ToggleGroupItem
      value="system"
      :aria-label="t('promptOptimizer.systemPromptHelp')"
      :title="t('promptOptimizer.systemPromptHelp')"
      class="px-1.5 py-0.5"
    >
      {{ t('promptOptimizer.systemPrompt') }}
    </ToggleGroupItem>
    <ToggleGroupItem
      value="user"
      :aria-label="t('promptOptimizer.userPromptHelp')"
      :title="t('promptOptimizer.userPromptHelp')"
      class="px-1.5 py-0.5"
    >
      {{ t('promptOptimizer.userPrompt') }}
    </ToggleGroupItem>
  </ToggleGroup>
</template>

<style scoped>
/* Scoped styles can be removed as ToggleGroup handles its own styling */
</style> 