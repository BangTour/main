const fs = require('fs');
const csv = require('csv-parser');

const convertCsvToJson = (csvFilePath) => {
    const results = [];
  
    return new Promise((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (data) => {
          results.push(data);
        })
        .on('end', () => {
          resolve(results);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  };

module.exports = convertCsvToJson;