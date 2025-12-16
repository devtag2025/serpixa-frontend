/**
 * Color Utility Functions
 * 
 * Centralized color system for consistent usage across the application.
 * These functions return Tailwind CSS class names based on semantic meaning.
 */

/**
 * Get color classes for SEO score
 * @param {number} score - SEO score (0-100)
 * @returns {Object} Object with text, bg, border, badge, and dot color classes
 */
export const getScoreColor = (score) => {
  if (score >= 80) {
    return {
      text: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      badge: "bg-emerald-100 text-emerald-700",
      dot: "bg-emerald-500",
      status: "Great!",
    };
  }
  if (score >= 50) {
    return {
      text: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
      badge: "bg-amber-100 text-amber-700",
      dot: "bg-amber-500",
      status: "Good",
    };
  }
  return {
    text: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    badge: "bg-red-100 text-red-700",
    dot: "bg-red-500",
    status: "Needs Improvement",
  };
};

/**
 * Get color classes for priority level
 * @param {string} priority - Priority level: 'critical', 'high', 'medium', 'low'
 * @returns {Object} Object with bg, border, text, badge, dot, and label
 */
export const getPriorityColor = (priority) => {
  switch (priority) {
    case "critical":
      return {
        bg: "bg-red-50",
        border: "border-red-200",
        text: "text-red-700",
        badge: "bg-red-100 text-red-700",
        dot: "bg-red-600",
        icon: "text-red-600",
        label: "Critical",
      };
    case "high":
      return {
        bg: "bg-orange-50",
        border: "border-orange-200",
        text: "text-orange-700",
        badge: "bg-orange-100 text-orange-700",
        dot: "bg-orange-500",
        icon: "text-orange-600",
        label: "High",
      };
    case "medium":
      return {
        bg: "bg-amber-50",
        border: "border-amber-200",
        text: "text-amber-700",
        badge: "bg-amber-100 text-amber-700",
        dot: "bg-amber-500",
        icon: "text-amber-600",
        label: "Medium",
      };
    case "low":
      return {
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-700",
        badge: "bg-blue-100 text-blue-700",
        dot: "bg-blue-500",
        icon: "text-blue-600",
        label: "Low",
      };
    default:
      return {
        bg: "bg-gray-50",
        border: "border-gray-200",
        text: "text-gray-700",
        badge: "bg-gray-100 text-gray-700",
        dot: "bg-gray-500",
        icon: "text-gray-600",
        label: "Unknown",
      };
  }
};

/**
 * Get color classes for impact level
 * @param {string} impact - Impact level: 'high', 'medium', 'low'
 * @returns {Object} Object with badge and label
 */
export const getImpactColor = (impact) => {
  switch (impact) {
    case "high":
      return {
        badge: "bg-red-100 text-red-700",
        label: "High",
      };
    case "medium":
      return {
        badge: "bg-amber-100 text-amber-700",
        label: "Medium",
      };
    case "low":
      return {
        badge: "bg-blue-100 text-blue-700",
        label: "Low",
      };
    default:
      return {
        badge: "bg-gray-100 text-gray-700",
        label: "Unknown",
      };
  }
};

/**
 * Get color classes for effort level
 * @param {string} effort - Effort level: 'easy', 'moderate', 'difficult'
 * @returns {Object} Object with badge and label
 */
export const getEffortColor = (effort) => {
  switch (effort) {
    case "easy":
      return {
        badge: "bg-emerald-100 text-emerald-700",
        label: "Easy",
      };
    case "moderate":
      return {
        badge: "bg-amber-100 text-amber-700",
        label: "Moderate",
      };
    case "difficult":
      return {
        badge: "bg-red-100 text-red-700",
        label: "Difficult",
      };
    default:
      return {
        badge: "bg-gray-100 text-gray-700",
        label: "Unknown",
      };
  }
};

/**
 * Get color classes for status
 * @param {string} status - Status: 'completed', 'pending', 'failed'
 * @returns {string} Badge color classes
 */
export const getStatusColor = (status) => {
  switch (status) {
    case "completed":
      return "bg-emerald-100 text-emerald-700";
    case "pending":
      return "bg-amber-100 text-amber-700";
    case "failed":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

/**
 * Color constants for reference
 * These match the Tailwind classes being used in the application
 */
export const COLORS = {
  // Success (Emerald)
  success: {
    50: "emerald-50",
    100: "emerald-100",
    200: "emerald-200",
    500: "emerald-500",
    600: "emerald-600",
    700: "emerald-700",
  },
  // Warning (Amber)
  warning: {
    50: "amber-50",
    100: "amber-100",
    200: "amber-200",
    500: "amber-500",
    600: "amber-600",
    700: "amber-700",
  },
  // Error (Red)
  error: {
    50: "red-50",
    100: "red-100",
    200: "red-200",
    500: "red-500",
    600: "red-600",
    700: "red-700",
    900: "red-900",
  },
  // Info (Blue)
  info: {
    50: "blue-50",
    100: "blue-100",
    200: "blue-200",
    600: "blue-600",
    700: "blue-700",
    800: "blue-800",
    900: "blue-900",
  },
  // Purple
  purple: {
    50: "purple-50",
    600: "purple-600",
  },
  // Gray
  gray: {
    50: "gray-50",
    100: "gray-100",
    200: "gray-200",
    300: "gray-300",
    400: "gray-400",
    500: "gray-500",
    600: "gray-600",
    700: "gray-700",
    900: "gray-900",
  },
};

