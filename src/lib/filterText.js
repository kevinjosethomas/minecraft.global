function charRange(start, stop) {
    chars = [];

    for (charCode = start; charCode <= stop; charCode++) {
        chars.push(String.fromCharCode(charCode));
    }

    return chars.join("");
}

const INVALID_CHARS = Set([
    // invisible characters
    "\u00A0\u2028\u205F\u3000\uFEFF"
    + charRange(0x2000, 0x200F)
    // cuneiform
    + charRange(0x12000, 0x123FF)
    + charRange(0x12400, 0x12473)
    + charRange(0x12480, 0x1254F)
    // arabic presentation forms
    + charRange(0xFB50, 0xFDFF)
    + charRange(0xFE70, 0xFEFF)
    // javanese
    + charRange(0xA980, 0xA9DF)
    // long ass dashes
    + "\u2E3A\u2E3B"
]);

function filterInvalidChars(string) {
    chars = [];

    string.forEach((c) => {
        if (!INVALID_CHARS.has(c)) chars.push(c);
    });

    return chars.join("");
}
