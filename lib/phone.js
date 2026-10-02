// Mirrors the backend's server/utils/phone.js: phones are stored as 10 US digits.

/** Digits only, with a leading US country code "1" dropped. */
export function phoneDigits(input) {
  let digits = String(input || '').replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('1')) digits = digits.slice(1);
  return digits;
}

/** True when the input is a complete 10-digit US number. */
export function isValidPhone(input) {
  return phoneDigits(input).length === 10;
}

/** Display as "(555) 123-4567"; partial input is formatted as far as it goes. */
export function formatPhone(input) {
  const d = phoneDigits(input).slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}
