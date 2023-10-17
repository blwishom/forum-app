// Normalize the data
const normalize = (list) => {
  const normalized = {};
  list.forEach(item => {
    normalized[item.id] = item;
  })
  return normalized;
}

export default normalize;
