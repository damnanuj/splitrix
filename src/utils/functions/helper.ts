import { Alert, Linking, Platform } from "react-native";

/**
 * Extracts the slug from a given URL string.
 * @param {string} url - The URL string to extract the slug from.
 * @return {string} - The extracted slug.
 */
export function extractSlug(url: string): string {
  if (!url || typeof url !== "string") {
    throw new Error("Invalid URL");
  }

  const parts = url.split("/");
  return parts[parts.length - 1] || "";
}

export function formatIndianNumber(num: any): string {
  if (!num) return "";
  const numString = num.toString();
  const lastThreeDigits = numString.slice(-3);
  const otherDigits = numString.slice(0, -3);

  const formattedNumber =
    otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
    (otherDigits ? "," : "") +
    lastThreeDigits;

  return formattedNumber;
}

export const J_COLORS: any = {
  yellowGold: {
    title: "Yellow Gold",
    key: "yellowGold",
  },
  roseGold: {
    title: "Rose Gold",
    key: "roseGold",
  },
  whiteGold: {
    title: "White Gold",
    key: "whiteGold",
  },
};

export const onCallMobilePhone = async (phoneNumber: number) => {
  if (Platform.OS === "android") {
    Linking.openURL(`tel:${phoneNumber}`);
    return;
  }

  if (Platform.OS === "ios") {
    Linking.openURL(`telprompt:${phoneNumber}`);
    return;
  }
};

export const openWhatsApp = async (phoneNumber: number) => {
  Linking.openURL(`http://api.whatsapp.com/send?phone=${phoneNumber}`);
};



export const formatDate = (isoString: string) => {
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}/${month}/${day} - ${hours}:${minutes}:${seconds}`;
};
