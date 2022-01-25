function charRange(start, stop) {
  chars = [];

  for (charCode = start; charCode <= stop; charCode++) {
    chars.push(String.fromCharCode(charCode));
  }

  return chars.join("");
}

const INVALID_CHARS = new Set([
  ...// invisible characters
  ("\u00A0\u2028\u205F\u3000\uFEFF" +
    charRange(0x2000, 0x200f) +
    // cuneiform
    charRange(0x12000, 0x123ff) +
    charRange(0x12400, 0x12473) +
    charRange(0x12480, 0x1254f) +
    // arabic presentation forms
    charRange(0xfb50, 0xfdff) +
    charRange(0xfe70, 0xfeff) +
    // javanese
    charRange(0xa980, 0xa9df) +
    // long ass dashes
    "\u2E3A\u2E3B"),
]);

function filterInvalidChars(text) {
  chars = [];

  [...text].forEach((c) => {
    if (!INVALID_CHARS.has(c)) chars.push(c);
  });

  return chars.join("");
}
