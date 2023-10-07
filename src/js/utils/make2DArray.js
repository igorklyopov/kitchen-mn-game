const make2DArray = (data, itemWidth) => {
  const result = [];
  for (let i = 0; i < data.length; i += itemWidth) {
    const element = data[i];

    result.push(data.slice(i, itemWidth + i));
  }
  return result;
};

export { make2DArray };