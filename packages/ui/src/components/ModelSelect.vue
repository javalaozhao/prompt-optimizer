<template>
  <div class="relative">
    <Select :model-value="modelValue" @update:model-value="selectModel" :disabled="disabled">
      <SelectTrigger>
        <SelectValue :placeholder="t('model.select.placeholder')" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel v-if="!enabledModels.length">{{ t('model.select.noAvailableModels') }}</SelectLabel>
          <SelectItem v-for="model in enabledModels" :key="model.key" :value="model.key">
            {{ model.name }}
          </SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <div class="p-1">
          <Button variant="ghost" class="w-full justify-start" @click="$emit('config')">
            <Settings class="mr-2 h-4 w-4" />
            {{ t('model.select.configure') }}
          </Button>
        </div>
      </SelectContent>
    </Select>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, inject, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Settings } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { AppServices } from '../types/services'
import type { ModelConfig } from '@prompt-optimizer/core'

const { t } = useI18n()

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
  // modelManager现在通过inject获取，不再需要props
})

const emit = defineEmits(['update:modelValue', 'config'])

const refreshTrigger = ref(0)

// 统一使用inject获取services
const services = inject<Ref<AppServices | null>>('services')
if (!services) {
  throw new Error('[ModelSelect] services未正确注入，请确保在App组件中正确provide了services')
}

const getModelManager = computed(() => {
  const servicesValue = services.value
  if (!servicesValue) {
    throw new Error('[ModelSelect] services未初始化，请确保应用已正确启动')
  }

  const manager = servicesValue.modelManager
  if (!manager) {
    throw new Error('[ModelSelect] modelManager未初始化，请确保服务已正确配置')
  }

  return manager
})

// 响应式数据存储

// 定义模型类型，因为它在ModelManager中是内部的
type Model = ModelConfig & { key: string };

const allModels = ref<Model[]>([])
const enabledModels = ref<Model[]>([])

// 加载模型数据
const loadModels = async () => {
  try {
    const manager = getModelManager.value
    if (!manager) {
      throw new Error('ModelManager not available')
    }
    
    allModels.value = await manager.getAllModels()
    enabledModels.value = await manager.getEnabledModels()
  } catch (error) {
    console.error('Failed to load models:', error)
    allModels.value = []
    enabledModels.value = []
  }
}

// 获取选中的模型
const getSelectedModel = computed(() => {
  refreshTrigger.value // 触发响应式更新
  return allModels.value.find(m => m.key === props.modelValue)
})





// 选择模型
const selectModel = (modelKey: any) => {
  if (typeof modelKey === 'string' && modelKey) {
    emit('update:modelValue', modelKey)
    refreshTrigger.value++
  }
}

// 添加刷新方法
const refresh = async () => {
  await loadModels()
  refreshTrigger.value++
}

// 暴露方法给父组件
defineExpose({
  refresh
})

// 监听模型数据变化，确保选中的模型仍然可用
watch(
  () => props.modelValue,
  async (newValue) => {
    if (newValue && !enabledModels.value.find(m => m.key === newValue)) {
      await loadModels()
      if (!enabledModels.value.find(m => m.key === newValue)) {
        emit('update:modelValue', enabledModels.value[0]?.key || '')
      }
    }
  }
)

// 初始化时加载模型
onMounted(async () => {
  await loadModels()
})


</script>

 