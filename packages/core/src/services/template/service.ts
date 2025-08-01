/**
 * 模板服务
 * 
 * 提供模板管理、处理和优化功能
 */

import { TemplateManager } from './manager';
import { TemplateProcessor } from './processor';
import { TemplateLanguageService } from './languageService';
import { Handlebars } from './minimal';
import { 
  Template, 
  ITemplateManager,
  TemplateMetadata,
  MessageTemplate
} from './types';

/**
 * 创建模板服务
 * 
 * @param storage 存储提供者
 * @param languageService 语言服务
 * @returns 模板管理器实例
 */
export function createTemplateService(storage: any, languageService?: any): ITemplateManager {
  return new TemplateManager(storage, languageService);
}

/**
 * 创建模板处理器
 * 
 * @param options 配置选项
 * @returns 模板处理器实例
 */
export function createTemplateProcessor(options: any = {}): TemplateProcessor {
  return new TemplateProcessor(options);
}

/**
 * 创建最小化模板处理器
 * 
 * @returns 最小化模板处理器实例
 */
export function createMinimalTemplateProcessor(): typeof Handlebars {
  return Handlebars;
}

/**
 * 创建语言服务
 * 
 * @param preferenceService 偏好设置服务
 * @returns 语言服务实例
 */
export function createLanguageService(preferenceService: any): TemplateLanguageService {
  return new TemplateLanguageService(preferenceService);
}

// 导出类
export { 
  TemplateManager,
  TemplateProcessor,
  Handlebars,
  TemplateLanguageService 
};

// 导出类型
export type {
  Template,
  ITemplateManager,
  TemplateMetadata,
  MessageTemplate
};
