export const spaceSeparate = (number) => {
  return !number
    ? 0
    : number
        .toString()
        .split("")
        .reverse()
        .map((x, index) => {
          return index !== 0 && index % 3 === 0 ? x + " " : x;
        })
        .reverse()
        .join("");
};
