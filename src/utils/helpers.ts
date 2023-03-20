export const countWords = (text: string) => {
  const words = text.split(' ');
  return words.length || 0;
};
