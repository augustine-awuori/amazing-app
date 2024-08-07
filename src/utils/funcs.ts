export const randomImage = "https://picsum.photos/1200/300";

function addComma(number: number | undefined) {
  if (!number) return "";

  const numberString = number.toString();

  const figures = numberString.split("");

  for (let i = figures.length - 3; i > 0; i -= 3) figures.splice(i, 0, ", ");

  return figures.join("");
}

export function getBoolean(value: unknown): boolean {
  return !!value;
}

export function formatPhoneNumber(phoneNumber: string | undefined): string {
  if (!phoneNumber) return "";

  const numericPhoneNumber = phoneNumber.replace(/\D/g, "");

  if (numericPhoneNumber.length < 10) return numericPhoneNumber;

  const formattedPhoneNumber = `(${numericPhoneNumber.slice(
    0,
    3
  )}) ${numericPhoneNumber.slice(3, 6)}-${numericPhoneNumber.slice(6)}`;

  return formattedPhoneNumber;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const addMessageToUrl = (url: string, text = "") =>
  text ? `${url} . ${text}` : url;

const navTo = (url: string, message?: string) =>
  window.open(addMessageToUrl(url, message), "_blank", "noopener,noreferrer");

function removeLeadingSlash(sentence: string) {
  if (sentence.length === 0) return sentence;

  if (sentence.charAt(0) === "/") return sentence.slice(1);

  return sentence;
}

function convertNameToUrl(name: string) {
  return name.trim().replace(/\s+/g, "-");
}

function revertUrlToName(url: string) {
  return url.replace(/-/g, " ");
}

function getChatUsersId(user1Id: string, user2Id: string) {
  return user1Id > user2Id ? user1Id + user2Id : user2Id + user1Id;
}

function getChatUsersName(name1: string, name2: string) {
  return `${getFirstWord(name1)} & ${getFirstWord(name2)}`;
}

function getFirstWord(sentence: string) {
  if (!sentence) return "";

  const words = sentence.trim().split(/\s+/);

  return words[0];
}

function getEndpointFromGuideTitle(guideTitle: string) {
  return guideTitle.replace(" ", "-");
}

function getTitleFromGuideEndpoint(endpoint: string | undefined) {
  return endpoint?.replace("-", " ");
}

export default {
  addComma,
  capitalizeFirstLetter,
  convertNameToUrl,
  formatPhoneNumber,
  getBoolean,
  getChatUsersId,
  getChatUsersName,
  getEndpointFromGuideTitle,
  getTitleFromGuideEndpoint,
  navTo,
  removeLeadingSlash,
  revertUrlToName,
  scrollToTop,
};
