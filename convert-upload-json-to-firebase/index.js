// run this script by
// node index.js


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, addDoc, collection } from "firebase/firestore"; 

import { readFile } from "fs/promises";

import convertCsvToJson from './utils/convert.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdHGg2OcDG_1vpvMRfKKpfjBCn25Z6uog",
  authDomain: "bangtour-dd78f.firebaseapp.com",
  projectId: "bangtour-dd78f",
  storageBucket: "bangtour-dd78f.appspot.com",
  messagingSenderId: "666305890458",
  appId: "1:666305890458:web:1a8ec4600f6d825c17b723"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

const list = [
    'package_tourism',
    'tourism_rating',
    'tourism_with_id',
]

// Add a new document in collection "cities"
async function convertCsv() { 
    // iterate through the list
    for (const item of list) {
        // convert csv to json
        await convertCsvToJson(`./dataset/${item}.csv`, `./output/${item}.json`)
    }
}

async function addFirebase (){
    let json;
    let index;
    // add to firebase
    // add package_tourism
    const package_tourism = await readFile('./output/package_tourism.json', 'utf8');
    json = JSON.parse(package_tourism);
    for (const item of json) {
        index = Object.keys(item)[0];
        console.log(item)
        await setDoc(doc(db, "package_tourism", item[index] ), item);
    }

    // add tourism_rating
    const tourism_rating = await readFile('./output/tourism_rating.json', 'utf8');
    json = JSON.parse(tourism_rating);
    for (const item of json) {
        console.log(item)
        await addDoc(collection(db, "tourism_rating"), item);
    }

    // add tourism_with_id
    const tourism_with_id = await readFile('./output/tourism_with_id.json', 'utf8');
    json = JSON.parse(tourism_with_id);
    for (const item of json) {
        delete item['']
        console.log(item)
        await setDoc(doc(db, "tourism_with_id", item.Place_Id), item);
    }
    
    return "success";

}

// // run the function
// convertCsv().then((res) => {
//     console.log(res);
//     addFirebase();
// }
// ).catch((err) => {
//     console.log(err);
// });

addFirebase().then((res) => {
    console.log(res);
}
).catch((err) => {
    console.log(err);
});


// Path: convert-csv-to-json\index.js
// Compare this snippet from convert-csv-to-json\utils\convert.js:
// // import fs and csv-parser modules
// import fs from 'fs';
// import csv from 'csv-parser';
//
// const convertCsvToJson = (csvFilePath, outputFilePath='./output/output.json') => {
//     const results = [];
//     return new Promise((resolve, reject) => {
//       fs.createReadStream(csvFilePath)
//         .pipe(csv())
//         .on('data', (data) => {
//           results.push(data);
//         })
//         .on('end', () => {
//             const jsonData = JSON.stringify(results);
//             fs.writeFile(outputFilePath, jsonData, (error) => {
//                 if (error) {
//                   reject(error);
//                 } else {
//                   resolve();
//                 }
//               });
//         })
//         .on('error', (error) => {
//           reject(error);
//         });
//     });
//   };
//
// export default  convertCsvToJson;
