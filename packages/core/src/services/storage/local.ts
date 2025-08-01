/**
 * 本地存储服务导出文件
 * 
 * 提供创建本地存储实例的工厂函数
 */

import { LocalStorageProvider } from './localStorageProvider';
import { IStorageProvider } from './types';

/**
 * 创建本地存储实例
 * 
 * @returns 本地存储提供者实例
 */
export function createLocalStorage(): IStorageProvider {
  return new LocalStorageProvider();
}
