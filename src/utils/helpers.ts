export const truncateString = (
  string: string,
  maximum: number,
  useWordBoundary?: boolean
): string => {
  if (string.length <= maximum) {
    return string;
  }
  const subString = string.slice(0, maximum - 1);
  return (
    (useWordBoundary
      ? subString.slice(0, subString.lastIndexOf(" "))
      : subString) + "..."
  );
};