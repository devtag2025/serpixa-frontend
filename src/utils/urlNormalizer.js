/**
 * Normalizes a URL to include protocol (https://)
 * Accepts: https://, http://, www., or naked domain
 * @param {string} url - The URL to normalize
 * @returns {string} - Normalized URL with https:// protocol
 */
export function normalizeUrl(url) {
  if (!url || typeof url !== 'string') {
    return url;
  }

  // Trim whitespace
  let normalized = url.trim();

  // Remove trailing slashes (we'll add one at the end if needed)
  normalized = normalized.replace(/\/+$/, '');

  // If already has protocol, return as is
  if (/^https?:\/\//i.test(normalized)) {
    return normalized;
  }

  // If starts with www., add https://
  if (/^www\./i.test(normalized)) {
    return `https://${normalized}`;
  }

  // For naked domains, add https://
  // Check if it looks like a domain (has at least one dot and valid characters)
  if (/^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)+$/i.test(normalized)) {
    return `https://${normalized}`;
  }

  // If it doesn't match domain pattern, return as is (let backend validation handle it)
  return normalized;
}

/**
 * Validates if a string looks like a valid URL (accepts multiple formats)
 * @param {string} url - The URL to validate
 * @returns {boolean} - True if URL looks valid
 */
export function isValidUrlFormat(url) {
  if (!url || typeof url !== 'string') {
    return false;
  }

  const trimmed = url.trim();
  if (trimmed.length === 0) {
    return false;
  }

  // Accept URLs with protocol
  if (/^https?:\/\/.+/i.test(trimmed)) {
    return true;
  }

  // Accept www. URLs
  if (/^www\..+/i.test(trimmed)) {
    return true;
  }

  // Accept naked domains (must have at least one dot and valid TLD)
  if (/^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)+$/i.test(trimmed)) {
    return true;
  }

  return false;
}

