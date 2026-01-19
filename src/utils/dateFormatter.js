/**
 * Formats a date in European format (DD/MM/YYYY)
 * @param {Date|string|number} date - Date to format
 * @param {Object} options - Formatting options
 * @param {boolean} options.includeTime - Whether to include time (default: false)
 * @param {boolean} options.shortMonth - Whether to use short month names (default: false)
 * @returns {string} Formatted date string in DD/MM/YYYY format
 */
export const formatEuropeanDate = (date, options = {}) => {
  if (!date) return "N/A";
  
  const dateObj = date instanceof Date ? date : new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return "N/A";
  }

  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();

  let formattedDate = `${day}/${month}/${year}`;

  if (options.includeTime) {
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    formattedDate += ` ${hours}:${minutes}`;
  }

  if (options.shortMonth) {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthName = monthNames[dateObj.getMonth()];
    formattedDate = `${day} ${monthName} ${year}`;
  }

  if (options.longMonth) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthName = monthNames[dateObj.getMonth()];
    formattedDate = `${day} ${monthName} ${year}`;
  }

  return formattedDate;
};

/**
 * Formats a date with time in European format (DD/MM/YYYY HH:MM)
 * @param {Date|string|number} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatEuropeanDateTime = (date) => {
  return formatEuropeanDate(date, { includeTime: true });
};
