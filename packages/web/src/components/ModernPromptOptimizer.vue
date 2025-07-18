<template>
  <div class="prompt-optimizer">
    <!-- 优化模式选择 -->
    <div class="mode-selector">
      <button
        v-for="mode in optimizationModes"
        :key="mode.value"
        :class="['modern-button', { active: currentMode === mode.value }]"
        @click="currentMode = mode.value"
      >
        {{ mode.label }}
      </button>
    </div>

    <!-- 输入区域 -->
    <div class="input-section">
      <label class="input-label">原始提示词</label>
      <textarea
        v-model="prompt"
        class="modern-input textarea"
        placeholder="输入您想要优化的提示词..."
        rows="4"
      ></textarea>
    </div>

    <!-- 模型和模板选择 -->
    <div class="options-row">
      <div class="option-group">
        <label class="option-label">选择模型</label>
        <select v-model="selectedModel" class="modern-input select">
          <option value="">选择AI模型</option>
          <option v-for="model in models" :key="model.id" :value="model.id">{{ model.name }}</option>
        </select>
      </div>

      <div class="option-group">
        <label class="option-label">选择模板</label>
        <select v-model="selectedTemplate" class="modern-input select">
          <option value="">选择模板</option>
          <option v-for="template in templates" :key="template.id" :value="template.id">{{ template.name }}</option>
        </select>
      </div>
    </div>

    <!-- 优化按钮 -->
    <button
      class="modern-button modern-button-primary optimize-btn"
      :disabled="!prompt.trim() || isOptimizing"
      @click="handleOptimize"
    >
      <span v-if="!isOptimizing">🚀 优化提示词</span>
      <span v-else">⏳ 优化中...</span>
    </button>

    <!-- 结果展示 -->
    <div v-if="result" class="result-section modern-card">
      <div class="result-header">
        <h3 class="result-title">✨ 优化结果</h3>
        <div class="result-actions">
          <button class="modern-button modern-button-ghost" @click="copyResult">
            📋 复制
          </button>
          <button class="modern-button modern-button-ghost" @click="saveResult">
            💾 保存
          </button>
        </div>
      </div>
      
      <div class="result-content">
        <textarea
          v-model="result.optimized"
          class="modern-input textarea result-textarea"
          readonly
          rows="6"
        ></textarea>
      </div>
      
      <div v-if="result.reasoning" class="reasoning-section">
        <h4 class="reasoning-title">优化说明</h4>
        <p class="reasoning-text">{{ result.reasoning }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useToast } from '@prompt-optimizer/ui'

interface Model {
  id: string
  name: string
  provider: string
}

interface Template {
  id: string
  name: string
  category: string
  description: string
}

interface OptimizationResult {
  original: string
  optimized: string
  reasoning: string
  model: string
  template: string
}

const toast = useToast()

// 状态
const prompt = ref('')
const currentMode = ref('system')
const selectedModel = ref('')
const selectedTemplate = ref('')
const isOptimizing = ref(false)
const result = ref<OptimizationResult | null>(null)

// 模拟数据
const models = ref<Model[]>([
  { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI' },
  { id: 'gpt-3.5', name: 'GPT-3.5 Turbo', provider: 'OpenAI' },
  { id: 'claude', name: 'Claude-3', provider: 'Anthropic' },
  { id: 'deepseek', name: 'DeepSeek', provider: 'DeepSeek' }
])

const templates = ref<Template[]>([
  { id: 'general', name: '通用优化', category: '基础', description: '适用于大多数场景的通用优化' },
  { id: 'creative', name: '创意写作', category: '创作', description: '优化创意写作类提示词' },
  { id: 'technical', name: '技术文档', category: '技术', description: '优化技术文档和代码相关提示词' },
  { id: 'business', name: '商务沟通', category: '商务', description: '优化商务沟通和邮件写作提示词' }
])

const optimizationModes = [
  { value: 'system', label: '系统优化' },
  { value: 'user', label: '用户优化' }
]

// 方法
const handleOptimize = async () => {
  if (!prompt.value.trim()) {
    toast.warning('请输入提示词')
    return
  }

  isOptimizing.value = true
  result.value = null

  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    result.value = {
      original: prompt.value,
      optimized: `🎯 **优化后的提示词**\n\n${prompt.value}\n\n✅ **改进要点：**\n- 增加了具体性要求\n- 明确了输出格式\n- 添加了质量评估标准`,
      reasoning: '通过增加具体性要求和明确输出格式，可以让AI生成更准确和有用的响应。',
      model: selectedModel.value || 'gpt-4',
      template: selectedTemplate.value || 'general'
    }

    toast.success('提示词优化完成！')
  } catch (error) {
    toast.error('优化失败，请重试')
  } finally {
    isOptimizing.value = false
  }
}

const copyResult = () => {
  if (result.value) {
    navigator.clipboard.writeText(result.value.optimized)
    toast.success('已复制到剪贴板')
  }
}

const saveResult = () => {
  if (result.value) {
    // 保存到历史记录
    toast.success('已保存到历史记录')
  }
}

onMounted(() => {
  // 加载初始数据
  console.log('Prompt Optimizer mounted')
})
</script>

<style scoped>
.prompt-optimizer {
  max-width: 800px;
  margin: 0 auto;
}

.mode-selector {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.input-section {
  margin-bottom: 1.5rem;
}

.input-label {
  display: block;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
}

.options-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.option-group {
  display: flex;
  flex-direction: column;
}

.option-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  margin-bottom: 0.25rem;
}

.textarea {
  resize: vertical;
  min-height: 120px;
}

.select {
  cursor: pointer;
}

.optimize-btn {
  width: 100%;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
}

.result-section {
  margin-top: 2rem;
  animation: fadeIn 0.3s ease;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.result-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.result-actions {
  display: flex;
  gap: 0.5rem;
}

.result-textarea {
  font-family: var(--font-family-mono);
  font-size: 0.875rem;
  line-height: 1.5;
}

.reasoning-section {
  margin-top: 1rem;
  padding: 1rem;
  background: var(--color-surface);
  border-radius: var(--radius-md);
}

.reasoning-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
}

.reasoning-text {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  line-height: 1.5;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .options-row {
    grid-template-columns: 1fr;
  }
  
  .result-actions {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>

<style>
.mode-selector .modern-button.active {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}
</style>