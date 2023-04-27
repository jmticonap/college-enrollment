export const getDiference = (base: object, comparable: object) => {
  const result = {};
  for (const key in comparable) {
    if (!Object.keys(base).includes(key)) {
      result[key] = comparable[key];
    }
  }
  return result;
};
