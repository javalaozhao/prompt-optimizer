<template>
  <div v-if="isInitializing" class="flex flex-col justify-center items-center h-screen text-lg bg-background text-text-primary">
    <Icon name="svg-spinners:180-ring-with-bg" class="w-9 h-9 mb-5" />
    <p>{{ t('log.info.initializing') }}</p>
  </div>
  <div v-else-if="!services" class="flex flex-col justify-center items-center h-screen text-lg bg-background text-red-500">
    <p>{{ t('toast.error.appInitFailed') }}</p>
  </div>
  <template v-if="isReady">
    <MainLayoutUI>
      <!-- Title Slot -->
      <template #title>
        <div class="flex items-center gap-3">
          <img src="/logo.png" :alt="t('app.logoAlt')" class="h-8 w-8 rounded-lg">
          <span class="text-xl font-bold">{{ t('app.title') }}</span>
        </div>
      </template>

      <!-- Actions Slot -->
      <template #actions>
        <ThemeToggleUI />
        <ActionButtonUI variant="ghost" @click="openTemplateManager">{{ $t('nav.templates') }}</ActionButtonUI>
        <ActionButtonUI variant="ghost" @click="promptHistory.showHistory = true">{{ $t('nav.history') }}</ActionButtonUI>
        <ActionButtonUI variant="ghost" @click="modelManager.showConfig = true">{{ $t('nav.modelManager') }}</ActionButtonUI>
        <ActionButtonUI variant="ghost" @click="showDataManager = true">{{ $t('nav.dataManager') }}</ActionButtonUI>
        <!-- 自动更新组件 - 仅在Electron环境中显示 -->
        <UpdaterIcon />
        <!-- GitHub图标已移除 -->
        <LanguageSwitchUI />
      </template>

      <!-- Main Content -->
      <Splitter class="flex-1 min-h-0">
        <SplitterPanel :min-size="30">
          <ContentCardUI class="h-full flex flex-col">
            <div class="flex-none">
              <InputPanelUI
                v-model="optimizer.prompt"
                v-model:selectedModel="modelManager.selectedOptimizeModel"
                :label="promptInputLabel"
                :placeholder="promptInputPlaceholder"
                :model-label="$t('promptOptimizer.optimizeModel')"
                :template-label="$t('promptOptimizer.templateLabel')"
                :button-text="$t('promptOptimizer.optimize')"
                :loading-text="$t('common.loading')"
                :loading="optimizer.isOptimizing"
                :disabled="optimizer.isOptimizing"
                @submit="handleOptimizePrompt"
                @configModel="modelManager.showConfig = true"
              >
                <template #optimization-mode-selector>
                  <OptimizationModeSelectorUI
                    v-model="selectedOptimizationMode"
                    @change="handleOptimizationModeChange"
                  />
                </template>
                <template #model-select>
                  <ModelSelectUI
                    ref="optimizeModelSelect"
                    :modelValue="modelManager.selectedOptimizeModel"
                    @update:modelValue="modelManager.selectedOptimizeModel = $event"
                    :disabled="optimizer.isOptimizing"
                    @config="modelManager.showConfig = true"
                  />
                </template>
                <template #template-select>
                  <template v-if="services && services.templateManager">
                    <TemplateSelectUI
                      ref="templateSelectRef"
                      v-model="currentSelectedTemplate"
                      :type="templateSelectType"
                      :optimization-mode="selectedOptimizationMode"
                      @manage="openTemplateManager"
                    />
                  </template>
                  <div v-else class="p-2 text-sm theme-placeholder">
                    {{ t('template.loading') }}
                  </div>
                </template>
              </InputPanelUI>
            </div>
            <div class="flex-1 min-h-0">
              <template v-if="services && services.templateManager">
                <PromptPanelUI
                  ref="promptPanelRef"
                  v-model:optimized-prompt="optimizer.optimizedPrompt"
                  :reasoning="optimizer.optimizedReasoning"
                  :original-prompt="optimizer.prompt"
                  :is-optimizing="optimizer.isOptimizing"
                  :is-iterating="optimizer.isIterating"
                  v-model:selected-iterate-template="optimizer.selectedIterateTemplate"
                  :versions="optimizer.currentVersions"
                  :current-version-id="optimizer.currentVersionId"
                  :is-latest-version="optimizer.isLatestVersion"
                  :optimization-mode="selectedOptimizationMode"
                  :services="services"
                  @iterate="handleIteratePrompt"
                  @switchVersion="handleSwitchVersion"
                />
              </template>
              <div v-else class="p-4 text-center theme-placeholder">
                {{ t('prompt.loading') }}
              </div>
            </div>
          </ContentCardUI>
        </SplitterPanel>
        <SplitterHandle />
        <SplitterPanel :min-size="30">
          <TestPanelUI
            ref="testPanelRef"
            class="flex-1 min-w-0 flex flex-col"
            :prompt-service="promptService"
            :original-prompt="optimizer.prompt"
            :optimized-prompt="optimizer.optimizedPrompt"
            :optimization-mode="selectedOptimizationMode"
            v-model="modelManager.selectedTestModel"
            @showConfig="modelManager.showConfig = true"
          />
        </SplitterPanel>
      </Splitter>
    </MainLayoutUI>

    <!-- Modals and Drawers that are conditionally rendered -->
    <ModelManagerUI v-if="isReady" v-model:show="modelManager.showConfig" />
    <TemplateManagerUI
      v-if="isReady"
      v-model:show="templateManagerState.showTemplates"
      v-model:templateType="templateManagerState.currentType"
      @languageChanged="handleTemplateLanguageChanged"
    />
    <HistoryDrawerUI
      v-if="isReady"
      v-model:show="promptHistory.showHistory"
      :history="promptHistory.history"
      @select="handleHistoryReuse"
      @deleteChain="promptHistory.handleDeleteChain"
    />
    <DataManagerUI v-if="isReady" v-model:show="showDataManager" @imported="handleDataImported" />

    <!-- ToastUI已在MainLayoutUI中包含，无需重复渲染 -->
  </template>
</template>

<script setup lang="ts">
import { ref, watch, computed, shallowRef, toRef, Ref } from 'vue'
import {
  MainLayoutUI, ThemeToggleUI, ActionButtonUI, ModelManagerUI, TemplateManagerUI, HistoryDrawerUI,
  ContentCardUI, InputPanelUI, OptimizationModeSelectorUI, ModelSelectUI, TemplateSelectUI,
  PromptPanelUI, TestPanelUI, LanguageSwitchUI, DataManagerUI, UpdaterIcon,
  Splitter, SplitterPanel, SplitterHandle, Icon,
  useToast,
  type OptimizationMode,
  useAppInitializer, usePromptOptimizer, useModelManager, usePromptHistory, useTemplateManager,
  type AppServices, type IPromptService
} from '@prompt-optimizer/ui'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const toast = useToast()

// 1. 初始化App
const { services, isInitializing, isReady } = useAppInitializer()

// 2. 核心服务和UI状态
const promptService = shallowRef<IPromptService | null>(null)
const showDataManager = ref(false)
const selectedOptimizationMode = ref<OptimizationMode>('system')

// 3. 模板和历史记录的UI状态
const templateManagerState = ref({ showTemplates: false, currentType: 'optimize' as 'optimize' | 'userOptimize' | 'iterate' })

// 4. 组合式函数
const optimizer = usePromptOptimizer(services as Ref<AppServices>)
const modelManager = useModelManager(
  services as Ref<AppServices>,
  optimizer.selectedOptimizeTemplate,
  optimizer.selectedUserOptimizeTemplate,
  optimizer.selectedIterateTemplate
)
const promptHistory = usePromptHistory(services as Ref<AppServices>)
useTemplateManager(
  services as Ref<AppServices>,
  {
    selectedOptimizeTemplate: toRef(optimizer, 'selectedOptimizeTemplate'),
    selectedUserOptimizeTemplate: toRef(optimizer, 'selectedUserOptimizeTemplate'),
    selectedIterateTemplate: toRef(optimizer, 'selectedIterateTemplate'),
  }
)

// 5. 获取对子组件的引用
const templateSelectRef = ref<any>(null)
const promptPanelRef = ref<any>(null)

// 6. 监听服务初始化
watch(services, (newServices) => {
  if (!newServices) return
  promptService.value = newServices.promptService
  console.log('All services and composables initialized.')
})

// 7. 处理数据导入成功后的刷新
const handleDataImported = () => {
  console.log('[App] 数据导入成功，即将刷新页面以应用所有更改...')
  toast.success(t('dataManager.import.successWithRefresh'))
  setTimeout(() => {
    window.location.reload()
  }, 1500)
}

// 8. 计算属性和方法
const currentSelectedTemplate = computed({
  get() {
    return selectedOptimizationMode.value === 'system'
      ? optimizer.selectedOptimizeTemplate
      : optimizer.selectedUserOptimizeTemplate
  },
  set(newValue) {
    if (!newValue) return
    if (selectedOptimizationMode.value === 'system') {
      optimizer.selectedOptimizeTemplate = newValue
    } else {
      optimizer.selectedUserOptimizeTemplate = newValue
    }
  }
})

// 处理优化提示词
const handleOptimizePrompt = () => {
  optimizer.handleOptimizePrompt()
}

// 处理迭代提示词
const handleIteratePrompt = (payload: any) => {
  optimizer.handleIteratePrompt(payload)
}

// 处理切换版本
const handleSwitchVersion = (versionId: any) => {
  optimizer.handleSwitchVersion(versionId)
}

// 打开模板管理器
const openTemplateManager = (templateType?: 'optimize' | 'userOptimize' | 'iterate') => {
  // 如果传入了模板类型，直接使用；否则根据当前优化模式判断（向后兼容）
  templateManagerState.value.currentType = templateType || (selectedOptimizationMode.value === 'system' ? 'optimize' : 'userOptimize')
  templateManagerState.value.showTemplates = true
}

// 处理优化模式变更
const handleOptimizationModeChange = (mode: OptimizationMode) => {
  selectedOptimizationMode.value = mode
}

// 处理模板语言变化
const handleTemplateLanguageChanged = (newLanguage: string) => {
  console.log('[App] 模板语言已切换:', newLanguage)

  // 刷新主界面的模板选择组件
  if (templateSelectRef.value?.refresh) {
    templateSelectRef.value.refresh()
  }

  // 刷新迭代页面的模板选择组件
  if (promptPanelRef.value?.refreshIterateTemplateSelect) {
    promptPanelRef.value.refreshIterateTemplateSelect()
  }
}

// 处理历史记录使用 - 智能模式切换
const handleHistoryReuse = async (context: any) => {
  const { chain } = context

  // 根据链条的根记录类型确定应该切换到的优化模式
  let targetMode: OptimizationMode
  if (chain.rootRecord.type === 'optimize') {
    targetMode = 'system'
  } else if (chain.rootRecord.type === 'userOptimize') {
    targetMode = 'user'
  } else {
    // 兜底：从根记录的 metadata 中获取优化模式
    targetMode = chain.rootRecord.metadata?.optimizationMode || 'system'
  }

  // 如果目标模式与当前模式不同，自动切换
  if (targetMode !== selectedOptimizationMode.value) {
    selectedOptimizationMode.value = targetMode
    toast.info(t('toast.info.optimizationModeAutoSwitched', {
      mode: targetMode === 'system' ? t('common.system') : t('common.user')
    }))
  }

  // 调用原有的历史记录处理逻辑
  await promptHistory.handleSelectHistory(context)
}

// 提示词输入标签
const promptInputLabel = computed(() => {
  return selectedOptimizationMode.value === 'system' ? t('promptOptimizer.originalPrompt') : t('promptOptimizer.userPromptInput')
})

// 提示词输入占位符
const promptInputPlaceholder = computed(() => {
  return selectedOptimizationMode.value === 'system' ? t('promptOptimizer.originalPromptPlaceholder') : t('promptOptimizer.userPromptPlaceholder')
})

const templateSelectType = computed(() => {
  return selectedOptimizationMode.value === 'system' ? 'optimize' : 'userOptimize'
})
</script>
