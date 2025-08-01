/**
 * 文件存储服务导出文件
 * 
 * 提供创建文件存储实例的工厂函数
 */

import { FileStorageProvider } from './fileStorageProvider';
import { IStorageProvider } from './types';

/**
 * 创建文件存储实例
 * 
 * @param userDataPath 用户数据路径
 * @returns 文件存储提供者实例
 */
export function createFileStorage(userDataPath: string): IStorageProvider {
  return new FileStorageProvider(userDataPath);
}
