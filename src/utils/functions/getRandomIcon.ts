// Feather icon names that can be used for transactions (only valid Feather icons from type definition)
const ICON_NAMES = [
  "film",
  "zap",
  "shopping-cart",
  "home",
  "wifi",
  "phone",
  "coffee",
  "gift",
  "globe",
  "briefcase",
  "truck",
  "music",
  "camera",
  "book",
  "heart",
  "credit-card",
  "dollar-sign",
  "trending-up",
  "trending-down",
  "activity",
  "package",
  "map-pin",
  "calendar",
  "clock",
  "tag",
  "star",
  "bell",
  "user",
  "users",
  "layers",
  "folder",
  "file",
  "image",
  "video",
  "headphones",
  "monitor",
  "smartphone",
  "tablet",
  "key",
  "lock",
  "unlock",
  "shield",
  "award",
  "target",
  "clipboard",
  "pie-chart",
  "bar-chart",
  "shopping-bag",
  "repeat",
  "send",
  "archive",
  "search",
  "menu",
  "check",
  "mail",
  "filter",
  "save",
  "paperclip",
  "inbox",
  "cloud",
  "eye",
  "delete",
  "upload",
  "download",
  "play",
  "database",
  "flag",
  "layout",
  "printer",
  "tool",
  "edit",
  "bookmark",
  "box",
  "chevron-down",
  "chevron-left",
  "chevron-right",
  "chevron-up",
  "circle",
  "code",
  "compass",
  "copy",
  "crop",
  "grid",
  "list",
  "log-out",
  "map",
  "mic",
  "moon",
  "mouse-pointer",
  "scissors",
  "share",
  "shuffle",
  "thermometer",
  "thumbs-down",
  "thumbs-up",
  "trash",
  "tv",
  "voicemail",
  "external-link",
  "airplay",
  "alert-circle",
  "alert-octagon",
  "alert-triangle",
  "align-center",
  "align-justify",
  "anchor",
  "aperture",
  "arrow-down-circle",
  "arrow-down-left",
  "arrow-down-right",
  "arrow-left-circle",
  "arrow-right-circle",
  "arrow-up-circle",
  "arrow-up-left",
  "arrow-up-right",
  "at-sign",
  "bar-chart-2",
  "battery",
  "battery-charging",
  "bell-off",
  "bluetooth",
  "bold",
  "book-open",
  "camera-off",
  "cast",
  "check-circle",
  "check-square",
  "chevrons-down",
  "chevrons-left",
  "chevrons-right",
  "chevrons-up",
  "cloud-drizzle",
  "cloud-lightning",
  "cloud-off",
  "cloud-rain",
  "cloud-snow",
  "columns",
  "command",
  "corner-down-left",
  "corner-down-right",
  "corner-left-down",
  "corner-left-up",
  "corner-right-down",
  "corner-right-up",
  "corner-up-left",
  "corner-up-right",
  "cpu",
  "crosshair",
  "disc",
  "divide",
  "divide-circle",
  "divide-square",
  "download-cloud",
  "droplet",
  "edit-2",
  "edit-3",
  "eye-off",
  "fast-forward",
  "figma",
  "file-minus",
  "file-plus",
  "file-text",
  "folder-minus",
  "folder-plus",
  "framer",
  "git-branch",
  "git-commit",
  "git-merge",
  "git-pull-request",
  "hard-drive",
  "hash",
  "help-circle",
  "hexagon",
  "italic",
  "life-buoy",
  "link",
  "link-2",
  "loader",
  "log-in",
  "maximize",
  "maximize-2",
  "message-circle",
  "message-square",
  "mic-off",
  "minimize",
  "minimize-2",
  "minus",
  "minus-circle",
  "minus-square",
  "more-horizontal",
  "more-vertical",
  "move",
  "navigation",
  "navigation-2",
  "octagon",
  "pause",
  "pause-circle",
  "pen-tool",
  "percent",
  "phone-call",
  "phone-forwarded",
  "phone-incoming",
  "phone-missed",
  "phone-off",
  "phone-outgoing",
  "play-circle",
  "plus",
  "plus-circle",
  "plus-square",
  "pocket",
  "power",
  "refresh-ccw",
  "refresh-cw",
  "rewind",
  "rotate-ccw",
  "rotate-cw",
  "server",
  "settings",
  "share-2",
  "shield-off",
  "sidebar",
  "skip-back",
  "skip-forward",
  "slash",
  "sliders",
  "smile",
  "speaker",
  "square",
  "stop-circle",
  "sun",
  "sunrise",
  "sunset",
  "terminal",
  "toggle-left",
  "toggle-right",
  "trash-2",
  "trello",
  "triangle",
  "twitch",
  "type",
  "umbrella",
  "underline",
  "upload-cloud",
  "user-check",
  "user-minus",
  "user-plus",
  "user-x",
  "video-off",
  "volume",
  "volume-1",
  "volume-2",
  "volume-x",
  "watch",
  "wifi-off",
  "wind",
  "x",
  "x-circle",
  "x-octagon",
  "x-square",
  "zap-off",
  "zoom-in",
  "zoom-out",
] as const;

type FeatherIconName = (typeof ICON_NAMES)[number];

// Color palette for icons
const ICON_COLORS = [
  "#3498db", // blue
  "#f1c40f", // yellow
  "#2ecc71", // green
  "#9b59b6", // purple
  "#e74c3c", // red
  "#1abc9c", // teal
  "#e67e22", // orange
  "#ff6b81", // pink
  "#16a085", // emerald
  "#34495e", // dark gray
  "#e91e63", // pink-red
  "#00bcd4", // cyan
  "#ff9800", // deep orange
  "#4caf50", // green
  "#2196f3", // blue
  "#9c27b0", // purple
  "#f44336", // red
  "#ffc107", // amber
  "#009688", // teal
  "#795548", // brown
];

export interface IconData {
  icon: FeatherIconName;
  iconColor: string;
}

/**
 * Hash a string to a number for consistent icon/color selection
 * Uses a more robust hash algorithm for better distribution
 */
const hashStringToNumber = (str: string): number => {
  let hash = 0;
  if (str.length === 0) return hash;

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    // Use a better hash algorithm (djb2 variant)
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  // Add additional mixing for better distribution
  hash = hash ^ (hash >>> 16);
  hash = hash * 0x85ebca6b;
  hash = hash ^ (hash >>> 13);
  hash = hash * 0xc2b2ae35;
  hash = hash ^ (hash >>> 16);

  return Math.abs(hash);
};

/**
 * Get a random icon and color based on a seed (e.g., transaction ID or title)
 * This ensures the same transaction always gets the same icon/color
 */
export const getRandomIcon = (seed: string): IconData => {
  // Create a hash from the seed
  const hash = hashStringToNumber(seed);

  // Use hash to select icon and color with better distribution
  // Use different parts of the hash for icon and color to ensure variety
  const iconIndex = hash % ICON_NAMES.length;
  const colorHash = hashStringToNumber(seed + "_color"); // Different hash for color
  const colorIndex = colorHash % ICON_COLORS.length;

  return {
    icon: ICON_NAMES[iconIndex],
    iconColor: ICON_COLORS[colorIndex],
  };
};
