const express = require('express');
const app = express();
const port = 3300;
const response = require('./response.js')
const convertCsvToJson = require('./utils/convertCsvToJson.js');
const getUniqueData = require('./utils/getUniqueData.js');

// const middleware = require('./middleware');
// app.use(middleware.decodeToken);

app.listen(port, () => {
  console.log(`Server sudah berjalan di localhost:${port}`);
});

app.get('/', (req, res)=> {
  res.json("tampilan Awal")
});

app.get('/package', (req, res) => {
  convertCsvToJson('../dataset/package_tourism.csv')
  .then((jsonData) => {
    response(200, jsonData, "package data", res)
  })
  .catch((error) => {
    res.status(error);
  });
})

app.get('/package/:City', (req,res) => {
  convertCsvToJson('../dataset/package_tourism.csv')
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
  convertCsvToJson('../dataset/tourism_with_id.csv')
  .then((jsonData) => {
    response(200, jsonData, "wisata data", res)
  })
  .catch((error) => {
    res.status(error);
  });
})

app.get('/wisata/:City', (req,res) => {
  convertCsvToJson('../dataset/tourism_with_id.csv')
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
  convertCsvToJson('../dataset/tourism_with_id.csv')
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
  convertCsvToJson('../dataset/tourism_with_id.csv')
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
  convertCsvToJson('../dataset/tourism_with_id.csv')
    .then((jsonData) => {
      const filteredData = jsonData.filter((item) => item.Category.toLowerCase().includes(category));
      response(200, filteredData, "data wisata by category", res)
    })
    .catch((error) => {
      res.status(500).json({ error: 'Internal server error' });
    });
});

// masih coba coba
// app.get('/sort-by-rating/asc', (req, res) => {
//   convertCsvToJson('../dataset/tourism_with_id.csv')
//     .then((jsonData) => {
//       const sortedData = jsonData.sort((a, b) => {
//         const ratingA = parseFloat(a.Rating);
//         const ratingB = parseFloat(b.Rating);
//         return ratingA + ratingB;
//       });
//       response(200, sortedData, "search data by name", res)
//     })
//     .catch((error) => {
//       res.status(500).json({ error: 'Internal server error' });
//     });
// });
