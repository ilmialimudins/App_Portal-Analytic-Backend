import alphabet from 'src/constants/alphabet';

export const getExcelColumn = (
  alphabetNumber: number,
  rowNumber = 1,
): string => {
  let column = '';

  const loop = Math.floor(alphabetNumber / alphabet.length);
  const char = alphabet.charAt(alphabetNumber % alphabet.length);

  if (loop > 0) {
    column = `${alphabet.charAt(loop - 1)}${char}`;
  } else {
    column = char;
  }

  return `${column + rowNumber}`;
};

export const getIndex = (string: string) => {
  const lenght = string.length;

  if (lenght === 1) {
    return alphabet.indexOf(string);
  } else if (lenght === 2) {
    return (
      25 * (alphabet.indexOf(string.charAt(0)) + 1) +
      (alphabet.indexOf(string.charAt(0)) +
        1 +
        alphabet.indexOf(string.charAt(1)))
    );
  } else {
    return -1;
  }
};
