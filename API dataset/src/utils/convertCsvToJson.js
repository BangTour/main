const fs = require('fs');
const csv = require('csv-parser');
const axios = require('axios');

const convertCsvToJson = async (csvUrl) => {
  const results = [];

  try {
    const response = await axios.get(csvUrl, { responseType: 'stream' });
    const stream = response.data.pipe(csv());

    return new Promise((resolve, reject) => {
      stream
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
  } catch (error) {
    throw new Error('Failed to fetch CSV data from the provided URL.');
  }
};

module.exports = convertCsvToJson;
