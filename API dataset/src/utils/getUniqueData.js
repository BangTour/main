function getUniqueData(data, property) {
    const uniqueData = [];
    const uniqueValues = [];
  
    for (let i = 0; i < data.length; i++) {
      const value = data[i][property];
      if (!uniqueValues.includes(value)) {
        uniqueValues.push(value);
        uniqueData.push(data[i]);
      }
    }
  
    return uniqueData;
  }

  module.exports = getUniqueData;