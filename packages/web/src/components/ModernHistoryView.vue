<template>
  <div class="history-view">
    <h3 class="section-title">📜 历史记录</h3>
    
    <div class="history-controls">
      <div class="search-filter">
        <input
          v-model="searchQuery"
          type="text"
          class="modern-input"
          placeholder="搜索历史记录..."
        />
      </div>
      
      <div class="actions">
        <button class="modern-button modern-button-secondary" @click="clearHistory">
          🗑️ 清空
        </button>
      </div>
    </div>

    <div class="history-list">
      <div
        v-for="item in filteredHistory"
        :key="item.id"
        class="history-item modern-card"
      >
        <div class="history-content">
          <div class="history-info">
            <h4 class="history-title">{{ item.title }}</h4>
            <p class="history-prompt">{{ item.prompt }}</p>
          </div>
          
          <div class="history-meta">
            <span class="history-time">{{ item.time }}</span>
            <span class="history-model">{{ item.model }}</span>
          </div>
        </div>
        
        <div class="history-actions">
          <button class="modern-button modern-button-ghost" @click="reuseItem(item)">
            ♻️ 重用
          </button>
          <button class="modern-button modern-button-ghost" @click="deleteItem(item)">
            ❌
          </button>
        </div>
      </div>
    </div>

    <div v-if="filteredHistory.length === 0" class="empty-state">
      <div class="empty-icon">📭</div>
      <p class="empty-text">暂无历史记录</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useToast } from '@prompt-optimizer/ui'

interface HistoryItem {
  id: string
  title: string
  prompt: string
  optimized: string
  model: string
  time: string
}

const toast = useToast()

// 状态
const searchQuery = ref('')
const history = ref<HistoryItem[]>([])

// 模拟数据
const mockHistory: HistoryItem[] = [
  {
    id: '1',
    title: '创意写作优化',
    prompt: '写一首关于春天的诗',
    optimized: '创作一首现代风格的春天诗歌，包含具体的自然意象和情感表达...',
    model: 'GPT-4',
    time: '2小时前'
  },
  {
    id: '2',
    title: '商务邮件',
    prompt: '给客户发送项目延期通知',
    optimized: '撰写一封专业且诚恳的项目延期通知邮件，包含具体原因和新的时间安排...',
    model: 'Claude-3',
    time: '1天前'
  },
  {
    id: '3',
    title: '技术解释',
    prompt: '解释什么是区块链',
    optimized: '用通俗易懂的语言解释区块链技术的工作原理和应用场景...',
    model: 'GPT-4',
    time: '3天前'
  }
]

// 计算属性
const filteredHistory = computed(() => {
  if (!searchQuery.value) return history.value
  
  const query = searchQuery.value.toLowerCase()
  return history.value.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.prompt.toLowerCase().includes(query) ||
    item.optimized.toLowerCase().includes(query)
  )
})

// 方法
const loadHistory = () => {
  history.value = mockHistory
}

const reuseItem = (item: HistoryItem) => {
  emit('reuse', item)
  toast.success('已加载到编辑器')
}

const deleteItem = (item: HistoryItem) => {
  history.value = history.value.filter(h => h.id !== item.id)
  toast.success('已删除记录')
}

const clearHistory = () => {
  history.value = []
  toast.success('已清空历史记录')
}

// 事件
const emit = defineEmits<{
  reuse: [item: HistoryItem]
}>()

onMounted(() => {
  loadHistory()
})
</script>

<style scoped>
.history-view {
  max-width: 800px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 1.5rem;
}

.history-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.search-filter {
  flex: 1;
  max-width: 300px;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.history-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem;
}

.history-content {
  flex: 1;
  margin-right: 1rem;
}

.history-info {
  margin-bottom: 0.5rem;
}

.history-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 0.25rem;
}

.history-prompt {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  line-height: 1.4;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.history-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.history-actions {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: var(--color-text-secondary);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.empty-text {
  font-size: 1.125rem;
}

@media (max-width: 768px) {
  .history-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-filter {
    max-width: none;
  }
  
  .history-item {
    flex-direction: column;
    align-items: stretch;
  }
  
  .history-content {
    margin-right: 0;
    margin-bottom: 1rem;
  }
  
  .history-actions {
    justify-content: flex-end;
  }
}
</style>