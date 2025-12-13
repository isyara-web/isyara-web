/**
 * Utility functions
 */

/**
 * Chunk array into smaller arrays
 * @param {array} array - Array to chunk
 * @param {number} size - Chunk size
 * @returns {array} - Chunked array
 */
export const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

/**
 * Check if URL is a valid YouTube URL
 * @param {string} url - URL to check
 * @returns {boolean} - True if valid YouTube URL
 */
export const isValidYouTubeURL = (url) => {
  if (!url || typeof url !== 'string') return false;
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
  return youtubeRegex.test(url);
};

/**
 * Check if URL is a supported video format
 * @param {string} url - URL to check
 * @returns {boolean} - True if supported video format
 */
export const isSupportedVideo = (url) => {
  if (!url || typeof url !== 'string') return false;
  const validExtensions = ['.mp4', '.webm', '.ogg'];
  return validExtensions.some(ext => url.toLowerCase().endsWith(ext));
};

/**
 * Extract display name from gesture path
 * @param {string} path - Gesture path
 * @returns {string} - Display name
 */
export const extractGestureName = (path) => {
  if (!path) return 'Unknown';
  
  if (path.startsWith('SKIPPED:')) {
    return path.replace('SKIPPED:', '').trim();
  }

  const filename = path.split('/').pop() || '';
  
  if (path.includes('/uploads/') && filename.includes('_')) {
    return decodeURIComponent(filename.split('_')[0]);
  }
  
  return decodeURIComponent(filename.replace('.mp4', ''));
};

/**
 * Format file size
 * @param {number} bytes - File size in bytes
 * @returns {string} - Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

