import { ModelConfig } from './types';

/**
 * 定义Electron配置管理器的接口，确保Web和Electron版本有一致的API
 */
export interface IElectronConfigManager {
  get<T>(key: string, defaultValue: T): T;
  set<T>(key: string, value: T): boolean;
  delete(key: string): boolean;
  has(key: string): boolean;
  clear(): boolean;
  syncFromMainProcess(): Promise<void>;
  isInitialized(): boolean;
  generateDefaultModels(): Record<string, ModelConfig>;
}

/**
 * Web版本的Electron配置管理器空实现
 */

/**
 * 检查是否在Electron渲染进程中
 * 在Web版本中始终返回false
 */
export function isElectronRenderer(): boolean {
  return false;
}

/**
 * Electron配置管理器的Web版本空实现
 */
/**
 * 获取Electron配置管理器的实例
 * 在Web版本中始终返回null
 */
export function getConfigManager(): IElectronConfigManager | null {
  return null;
}

export class ElectronConfigManager implements IElectronConfigManager {
  /**
   * 获取配置值
   * @param key 配置键
   * @param defaultValue 默认值
   * @returns 始终返回默认值
   */
  get<T>(_key: string, defaultValue: T): T {
    console.warn('[ElectronConfigManager] 在Web环境中尝试使用Electron配置管理器，返回默认值');
    return defaultValue;
  }

  /**
   * 设置配置值
   * @param key 配置键
   * @param value 配置值
   * @returns 始终返回false
   */
  set<T>(_key: string, _value: T): boolean {
    console.warn('[ElectronConfigManager] 在Web环境中尝试使用Electron配置管理器，操作被忽略');
    return false;
  }

  /**
   * 删除配置值
   * @param key 配置键
   * @returns 始终返回false
   */
  delete(_key: string): boolean {
    console.warn('[ElectronConfigManager] 在Web环境中尝试使用Electron配置管理器，操作被忽略');
    return false;
  }

  /**
   * 检查配置是否存在
   * @param key 配置键
   * @returns 始终返回false
   */
  has(_key: string): boolean {
    console.warn('[ElectronConfigManager] 在Web环境中尝试使用Electron配置管理器，操作被忽略');
    return false;
  }

  /**
   * 清除所有配置
   * @returns 始终返回false
   */
  clear(): boolean {
    console.warn('[ElectronConfigManager] 在Web环境中尝试使用Electron配置管理器，操作被忽略');
    return false;
  }

  /**
   * 从主进程同步配置
   * @returns 始终返回一个resolved的Promise
   */
  async syncFromMainProcess(): Promise<void> {
    console.warn('[ElectronConfigManager] 在Web环境中尝试使用Electron配置管理器，操作被忽略');
    return Promise.resolve();
  }

  /**
   * 检查是否已初始化
   * @returns 始终返回false
   */
  isInitialized(): boolean {
    console.warn('[ElectronConfigManager] 在Web环境中尝试使用Electron配置管理器，操作被忽略');
    return false;
  }

  /**
   * 生成默认模型配置
   * @returns 始终返回空对象
   */
  generateDefaultModels(): Record<string, ModelConfig> {
    console.warn('[ElectronConfigManager] 在Web环境中尝试使用Electron配置管理器，操作被忽略');
    return {};
  }
}