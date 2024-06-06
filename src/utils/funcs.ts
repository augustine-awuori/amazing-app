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

export default {
  addComma,
  capitalizeFirstLetter,
  formatPhoneNumber,
  getBoolean,
  scrollToTop,
};
