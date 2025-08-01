<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
}>()

function handleOpenChange(open: boolean) {
  emit('update:modelValue', open)
}
</script>

<template>
  <Dialog :open="modelValue" @update:open="handleOpenChange">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>
          <slot name="title">{{ t('common.title') }}</slot>
        </DialogTitle>
      </DialogHeader>
      <div class="py-4">
        <slot />
      </div>
      <DialogFooter>
        <slot name="footer">
          <Button variant="outline" @click="emit('update:modelValue', false)">
            {{ t('common.cancel') }}
          </Button>
          <Button @click="emit('confirm')">
            {{ t('common.confirm') }}
          </Button>
        </slot>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template> 