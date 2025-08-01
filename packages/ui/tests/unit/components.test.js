import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { ActionButtonUI, ContentCardUI } from '../../src'

// 创建i18n实例（Vue 3不需要createLocalVue）
const i18n = createI18n({
  legacy: false,
  locale: 'zh-CN',
  messages: {}
})

describe('基础UI组件测试', () => {
  describe('ActionButtonUI', () => {
    it('应该正确渲染按钮文本', () => {
      const buttonText = '测试按钮'
      const wrapper = mount(ActionButtonUI, {
        global: {
          plugins: [i18n]  // 直接使用i18n插件
        },
        slots: {
          default: buttonText
        }
      })
      expect(wrapper.text()).toContain(buttonText)
    })

    it('应该正确处理loading状态', async () => {
      const wrapper = mount(ActionButtonUI, {
        global: {
          plugins: [i18n]  // 添加i18n插件
        },
        props: {
          text: '测试按钮',
          icon: '🔄',
          loading: false
        }
      })
      
      // 初始状态不是loading
      expect(wrapper.props('loading')).toBe(false)
      
      // 修改为loading状态
      await wrapper.setProps({ loading: true })
      expect(wrapper.props('loading')).toBe(true)
    })
  })

  describe('ContentCardUI', () => {
    it('应该正确渲染slot内容', () => {
      const slotContent = '测试内容'
      const wrapper = mount(ContentCardUI, {
        slots: {
          default: slotContent
        }
      })
      expect(wrapper.text()).toContain(slotContent)
    })
  })
}) 