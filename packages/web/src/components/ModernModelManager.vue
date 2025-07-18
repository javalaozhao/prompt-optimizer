<template>
  <div class="model-manager">
    <h3 class="section-title">🤖 AI模型管理</h3>
    
    <div class="models-grid">
      <div v-for="model in models" :key="model.id" class="model-card modern-card">
        <div class="model-header">
          <h4 class="model-name">{{ model.name }}</h4>
          <span class="model-status" :class="model.status">{{ model.status }}</span>
        </div>
        
        <p class="model-description">{{ model.description }}</p>
        
        <div class="model-config">
          <button class="modern-button modern-button-secondary" @click="configureModel(model)">
            配置
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Model {
  id: string
  name: string
  description: string
  status: 'active' | 'inactive' | 'error'
  provider: string
}

const models = ref<Model[]>([
  { id: 'gpt-4', name: 'GPT-4', description: 'OpenAI最新最强大的语言模型', status: 'active', provider: 'OpenAI' },
  { id: 'claude-3', name: 'Claude-3', description: 'Anthropic开发的智能对话模型', status: 'active', provider: 'Anthropic' },
  { id: 'deepseek', name: 'DeepSeek', description: '高性能中文AI助手', status: 'inactive', provider: 'DeepSeek' }
])

const emit = defineEmits<{
  config: [model: Model]
}>()

const configureModel = (model: Model) => {
  emit('config', model)
}
</script>

<style scoped>
.model-manager {
  max-width: 800px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 1.5rem;
}

.models-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.model-card {
  padding: 1.5rem;
}

.model-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.model-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.model-status {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.model-status.active {
  background: var(--color-success-light);
  color: var(--color-success);
}

.model-status.inactive {
  background: var(--color-gray-100);
  color: var(--color-gray-600);
}

.model-description {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.model-config {
  display: flex;
  justify-content: flex-end;
}
</style>