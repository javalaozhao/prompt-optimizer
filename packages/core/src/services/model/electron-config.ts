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
export class ElectronConfigManager {
  /**
   * 获取配置值
   * @param key 配置键
   * @param defaultValue 默认值
   * @returns 始终返回默认值
   */
  get<T>(key: string, defaultValue: T): T {
    console.warn('[ElectronConfigManager] 在Web环境中尝试使用Electron配置管理器，返回默认值');
    return defaultValue;
  }

  /**
   * 设置配置值
   * @param key 配置键
   * @param value 配置值
   * @returns 始终返回false
   */
  set<T>(key: string, value: T): boolean {
    console.warn('[ElectronConfigManager] 在Web环境中尝试使用Electron配置管理器，操作被忽略');
    return false;
  }

  /**
   * 删除配置值
   * @param key 配置键
   * @returns 始终返回false
   */
  delete(key: string): boolean {
    console.warn('[ElectronConfigManager] 在Web环境中尝试使用Electron配置管理器，操作被忽略');
    return false;
  }

  /**
   * 检查配置是否存在
   * @param key 配置键
   * @returns 始终返回false
   */
  has(key: string): boolean {
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
}