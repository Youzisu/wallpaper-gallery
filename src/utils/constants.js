// ========================================
// 常量定义
// ========================================

// GitHub 图床基础 URL（使用 raw.githubusercontent.com，对中文文件名支持更好）
export const IMAGE_BASE_URL = 'https://raw.githubusercontent.com/IT-NuanxinPro/nuanXinProPic/main/wallpaper'

// 缩略图基础 URL（本地生成的 webp 缩略图）
export const THUMBNAIL_BASE_URL = 'https://raw.githubusercontent.com/IT-NuanxinPro/nuanXinProPic/main/thumbnail'

// 壁纸数据 JSON 路径（使用 import.meta.env.BASE_URL 确保路径正确）
export const WALLPAPERS_DATA_URL = `${import.meta.env.BASE_URL}data/wallpapers.json`

// ========================================
// 图片代理服务配置（备用方案，如本地缩略图不可用时使用）
// ========================================
export const IMAGE_PROXY = {
  BASE_URL: 'https://wsrv.nl/',
  THUMB_WIDTH: 400,
  THUMB_QUALITY: 80,
  FORMAT: 'webp',
}

/**
 * 生成缩略图 URL
 * 优先使用本地 GitHub 仓库中的预生成缩略图
 * @param {string} originalUrl - 原图 URL
 * @returns {string} 缩略图 URL
 */
export function getThumbnailUrl(originalUrl) {
  // 从原图 URL 中提取文件名（不含扩展名）
  // 例如：https://raw.githubusercontent.com/.../wallpaper/图片.jpg -> 图片
  const urlParts = originalUrl.split('/')
  const filename = urlParts[urlParts.length - 1]
  const filenameNoExt = filename.substring(0, filename.lastIndexOf('.'))

  // 返回本地缩略图 URL（webp 格式）
  return `${THUMBNAIL_BASE_URL}/${encodeURIComponent(filenameNoExt)}.webp`
}

// 排序选项
export const SORT_OPTIONS = [
  { value: 'newest', label: '最新优先', icon: 'clock' },
  { value: 'oldest', label: '最早优先', icon: 'clock-reverse' },
  { value: 'largest', label: '最大优先', icon: 'arrow-down' },
  { value: 'smallest', label: '最小优先', icon: 'arrow-up' },
  { value: 'name-asc', label: '名称 A-Z', icon: 'sort-alpha' },
  { value: 'name-desc', label: '名称 Z-A', icon: 'sort-alpha-reverse' },
]

// 格式过滤选项
export const FORMAT_OPTIONS = [
  { value: 'all', label: '全部格式' },
  { value: 'jpg', label: 'JPG' },
  { value: 'png', label: 'PNG' },
]

// ========================================
// 分辨率标签阈值（按长边判断）
// ========================================
export const RESOLUTION_THRESHOLDS = [
  { minWidth: 5120, label: '5K+', type: 'danger' },
  { minWidth: 3840, label: '4K+', type: 'warning' },
  { minWidth: 2560, label: '4K', type: 'success' },
  { minWidth: 1920, label: '超清', type: 'info' },
  { minWidth: 1280, label: '高清', type: 'primary' },
  { minWidth: 0, label: '标清', type: 'secondary' },
]

// 分辨率标签阈值 (bytes) - 用于文件大小估算（兼容旧逻辑）
export const SIZE_THRESHOLDS = {
  SMALL: 500 * 1024, // < 500KB
  MEDIUM: 2 * 1024 * 1024, // < 2MB
  LARGE: 5 * 1024 * 1024, // < 5MB
  // >= 5MB 为超大
}

// 分辨率标签
export const SIZE_LABELS = {
  SMALL: '标清',
  MEDIUM: '高清',
  LARGE: '4K',
  XLARGE: '超清',
}

// 主题
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
}

// localStorage 键名
export const STORAGE_KEYS = {
  THEME: 'wallpaper-gallery-theme',
  SORT: 'wallpaper-gallery-sort',
}
