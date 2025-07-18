<template>
  <div class="template-gallery">
    <!-- 搜索和筛选 -->
    <div class="gallery-controls">
      <div class="search-box">
        <input
          v-model="searchQuery"
          type="text"
          class="modern-input"
          placeholder="搜索模板..."
        />
        <button class="search-btn">🔍</button>
      </div>
      
      <div class="filter-tabs">
        <button
          v-for="category in categories"
          :key="category"
          :class="['modern-button', { active: selectedCategory === category }]"
          @click="selectedCategory = category"
        >
          {{ category }}
        </button>
      </div>
    </div>

    <!-- 模板网格 -->
    <div class="templates-grid">
      <div
        v-for="template in filteredTemplates"
        :key="template.id"
        class="template-card modern-card"
        @click="selectTemplate(template)"
      >
        <div class="template-icon">
          {{ template.icon }}
        </div>
        
        <div class="template-content">
          <h3 class="template-title">{{ template.name }}</h3>
          <p class="template-description">{{ template.description }}</p>
          
          <div class="template-meta">
            <span class="template-category">{{ template.category }}</span>
            <span class="template-usage">{{ template.usageCount }} 次使用</span>
          </div>
        </div>
        
        <button class="template-use-btn modern-button modern-button-primary"
          @click.stop="useTemplate(template)"
        >
          使用模板
        </button>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-if="filteredTemplates.length === 0" class="empty-state">
      <div class="empty-icon">🔍</div>
      <p class="empty-text">未找到匹配的模板</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useToast } from '@prompt-optimizer/ui'

interface Template {
  id: string
  name: string
  description: string
  category: string
  icon: string
  usageCount: number
  content: string
  tags: string[]
}

const toast = useToast()

// 状态
const searchQuery = ref('')
const selectedCategory = ref('全部')
const templates = ref<Template[]>([])

// 分类
const categories = ['全部', '基础', '创作', '技术', '商务', '教育']

// 模拟数据
const mockTemplates: Template[] = [
  {
    id: 'creative-writing',
    name: '创意写作助手',
    description: '帮助生成富有创意的文本内容，适用于故事、诗歌等创作',
    category: '创作',
    icon: '✍️',
    usageCount: 234,
    content: '作为创意写作助手，请帮我...',
    tags: ['写作', '创意', '故事']
  },
  {
    id: 'code-explanation',
    name: '代码解释器',
    description: '详细解释代码功能和实现原理，适合学习和技术文档',
    category: '技术',
    icon: '💻',
    usageCount: 189,
    content: '请详细解释以下代码的功能和实现原理...',
    tags: ['编程', '技术', '解释']
  },
  {
    id: 'business-email',
    name: '商务邮件',
    description: '专业的商务邮件模板，适用于各种商务沟通场景',
    category: '商务',
    icon: '📧',
    usageCount: 156,
    content: '请帮我撰写一封专业的商务邮件，内容是...',
    tags: ['商务', '邮件', '沟通']
  },
  {
    id: 'study-helper',
    name: '学习助手',
    description: '帮助理解和学习复杂概念，适合学生和自学者',
    category: '教育',
    icon: '📚',
    usageCount: 203,
    content: '请用简单易懂的方式解释以下概念...',
    tags: ['学习', '教育', '理解']
  },
  {
    id: 'social-media',
    name: '社交媒体',
    description: '生成吸引人的社交媒体内容，包括帖子、标题等',
    category: '创作',
    icon: '📱',
    usageCount: 178,
    content: '请为以下主题生成社交媒体内容...',
    tags: ['社交', '媒体', '内容']
  },
  {
    id: 'data-analysis',
    name: '数据分析',
    description: '帮助分析和解释数据，生成数据洞察和报告',
    category: '技术',
    icon: '📊',
    usageCount: 145,
    content: '请分析以下数据并生成洞察报告...',
    tags: ['数据', '分析', '报告']
  }
]

// 计算属性
const filteredTemplates = computed(() => {
  let filtered = templates.value

  // 按类别筛选
  if (selectedCategory.value !== '全部') {
    filtered = filtered.filter(t => t.category === selectedCategory.value)
  }

  // 按搜索词筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(t => 
      t.name.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query) ||
      t.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  return filtered
})

// 方法
const selectTemplate = (template: Template) => {
  console.log('选择模板:', template.name)
  emit('select', template)
}

const useTemplate = (template: Template) => {
  emit('use', template)
  toast.success(`已使用模板: ${template.name}`)
}

const loadTemplates = async () => {
  // 模拟API调用
  templates.value = mockTemplates
}

// 事件
const emit = defineEmits<{
  select: [template: Template]
  use: [template: Template]
}>()

onMounted(() => {
  loadTemplates()
})
</script>

<style scoped>
.template-gallery {
  max-width: 1200px;
  margin: 0 auto;
}

.gallery-controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.search-box {
  display: flex;
  gap: 0.5rem;
  max-width: 400px;
}

.search-btn {
  padding: 0.5rem 1rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
}

.filter-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.templates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.template-card {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
}

.template-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.template-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
}

.template-content {
  flex: 1;
  margin-bottom: 1rem;
}

.template-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
}

.template-description {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.template-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
}

.template-category {
  background: var(--color-primary-light);
  color: var(--color-primary);
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  font-weight: 500;
}

.template-usage {
  color: var(--color-text-muted);
}

.template-use-btn {
  width: 100%;
  margin-top: 1rem;
  font-size: 0.875rem;
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
  margin-bottom: 0.5rem;
}

.filter-tabs .modern-button.active {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

@media (max-width: 768px) {
  .templates-grid {
    grid-template-columns: 1fr;
  }
  
  .gallery-controls {
    align-items: stretch;
  }
  
  .search-box {
    max-width: none;
  }
  
  .filter-tabs {
    justify-content: center;
  }
}

<style>
.filter-tabs .modern-button {
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
}
</style>
