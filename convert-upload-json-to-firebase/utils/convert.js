// import fs and csv-parser modules
import fs from 'fs';
import csv from 'csv-parser';

const convertCsvToJson = (csvFilePath, outputFilePath='./output/output.json') => {
    const results = [];
    return new Promise((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (data) => {
          results.push(data);
        })
        .on('end', () => {
            const jsonData = JSON.stringify(results);
            fs.writeFile(outputFilePath, jsonData, (error) => {
                if (error) {
                  reject(error);
                } else {
                  resolve();
                }
              });
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  };

export default  convertCsvToJson;