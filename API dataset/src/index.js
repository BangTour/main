const express = require('express');
const app = express();
const port = 3300;
const response = require('./response.js')
const convertCsvToJson = require('./utils/convertCsvToJson.js');
const getUniqueData = require('./utils/getUniqueData.js');

// const middleware = require('./middleware');
// app.use(middleware.decodeToken);

//panggil data csv dari cloud storage bucket
const package = 'https://storage.googleapis.com/coba_1/package_tourism.csv';
const tourism = 'https://storage.googleapis.com/coba_1/tourism_with_id.csv';

app.listen(port, () => {
  console.log(`Server sudah berjalan di localhost:${port}`);
});

app.get('/', (req, res)=> {
  res.json("tampilan Awal")
});

app.get('/package', (req, res) => {
  convertCsvToJson(package)
  .then((jsonData) => {
    response(200, jsonData, "package data", res)
  })
  .catch((error) => {
    res.status(error);
  });
})

app.get('/package/:City', (req,res) => {
  convertCsvToJson(package)
  .then((jsonData) => {
    const City = req.params.City.toLowerCase();
    const filteredData = jsonData.filter((item) => item.City.toLowerCase() == City);
    response(200, filteredData, "package data by city", res)
  })
  .catch((error) => {
    res.status(error);
  });
})

app.get('/wisata', (req, res) => {
  convertCsvToJson(tourism)
  .then((jsonData) => {
    response(200, jsonData, "wisata data", res)
  })
  .catch((error) => {
    res.status(error);
  });
})

app.get('/wisata/:City', (req,res) => {
  convertCsvToJson(tourism)
  .then((jsonData) => {
    const City = req.params.City.toLowerCase();
    const filteredData = jsonData.filter((item) => item.City.toLowerCase() == City);
    response(200, filteredData, "wisata data by city", res)
  })
  .catch((error) => {
    res.status(error);
  });
})

app.get('/search/:name', (req,res) => {
  convertCsvToJson(tourism)
  .then((jsonData)=> {
    const name = req.params.name.toLowerCase();
    const filteredData = jsonData.filter((item)=> item.Place_Name.toLowerCase().includes(name));
    response(200, filteredData, "search data by name", res)
  })
  .catch((error)=>{
    res.status(error);
  })
})

app.get('/category-list', (req, res) => {
  convertCsvToJson(tourism)
    .then((jsonData) => {
      const uniqueCategories = getUniqueData(jsonData, 'Category').map(item => item.Category);
      response(200, uniqueCategories, "category data", res)
    })
    .catch((error) => {
      res.status(500).json({ error: 'Internal server error' });
    });
});

app.get('/category/:category', (req, res) => {
  const category = req.params.category.toLowerCase();
  convertCsvToJson(tourism)
    .then((jsonData) => {
      const filteredData = jsonData.filter((item) => item.Category.toLowerCase().includes(category));
      response(200, filteredData, "data wisata by category", res)
    })
    .catch((error) => {
      res.status(500).json({ error: 'Internal server error' });
    });
});
