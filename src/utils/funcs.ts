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

export default {
  addComma,
  capitalizeFirstLetter,
  formatPhoneNumber,
  getBoolean,
  navTo,
  removeLeadingSlash,
  scrollToTop,
};
