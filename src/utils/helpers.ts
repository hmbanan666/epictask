export const countWords = (text: string) => {
  const words = text.split(' ');
  return words.length || 0;
};

export const russianWordEnding = (
  number: number,
  titles: [string, string, string]
): string => {
  // 1 огурец, 2 огурца, 5 огурцов
  const cases = [2, 0, 1, 1, 1, 2];
  const index =
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5];

  if (index === 0) return titles[0];
  if (index === 1) return titles[1];
  if (index === 2) return titles[2];

  return titles[0];
};
