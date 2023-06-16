# API Documentation

# Table of Contents
- [API Documentation](#api-documentation)
- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
- [API](#api) :
  - [Database API](#database-api)
  - [ML API](#ml-api)

# Introduction

This is the API documentation for the project. The API is split into two parts: the database API and the ML API. The database API is used to interact with the database, and the ML API is used to interact with the ML model.
This project use Google App Engine for the Database API, and Compute Engine paired with a Flask server for the ML API.

ML API is developed using : Flask, Gunicorn, and Nginx.

The ML API is deployed on a Compute Engine instance. The instance is running Ubuntu 18.04. The instance is also running Nginx as a reverse proxy to Gunicorn. The Gunicorn server is running the Flask app. Load balancing is done using Google Load Balancer with endpoint mapped to Google Cloud DNS.

The database API is deployed on Google App Engine. The API is developed using Javascript with help of NextJS framework for the middleware.

# API

## Database API

Base URL: `https://bangtour-dd78f.et.r.appspot.com/api`

### Get Package Tourism 

**Endpoint:** `/package-tourism?`

**Description:** Retrieves package tourism information based on the provided ID.

**Method:** GET

**Query Params:**

- `id` : The ID of the package tourism. If not provided, all package tourism will be returned.

**Example Request:**

`GET /package-tourism?id=1`

**Example Response:**

```json
{
  "message": "success",
  "data": [
    {
      "City": "Jakarta",
      "Place_Tourism3": "Museum Tekstil",
      "Package": "1",
      "Place_Tourism2": "Taman Ayodya",
      "Place_Tourism5": "",
      "Place_Tourism1": "Pasar Tanah Abang",
      "Place_Tourism4": ""
    }
  ]
}
```

**Error Response (Invalid Query):**

```json
{
  "message": "invalid query",
  "data": []
}
```

### Get Places

**Endpoint:** `/places?`

**Description:** Retrieves place information based on the provided ID. If no ID is provided, it returns information for all places.

**Method:** GET

**Query Params:**

- `id` : The ID of the places

**Example Request:**

- Get all places :

  `GET /places`
- Get place by ID :

    `GET /places?id=1`

**Example Response:**

```json
{
  "message": "success",
  "data": [
    {
      "City": "Jakarta",
      "Coordinate": "{'lat': -6.1753924, 'lng': 106.8271528}",
      "Description": "Monumen Nasional...",
      "Place_Name": "Monumen Nasional",
      "Lat": "-6.1753924",
      "Time_Minutes": "15",
      "Rating": "4.6",
      "Long": "106.8271528",
      "Price": "20000",
      "Place_Id": "1",
      "Category": "Budaya"
    },    
  ]
}
```

**Error Response (Invalid Query):**

```json
{
  "message": "invalid query",
  "data": []
}
```

### Get Ratings

**Endpoint:** `/ratings?`

**Description:**  Retrieves user ratings based on the provided query. The query can be `user_id={}`,` place_id={}`, or both.

**Method:** GET

**Query Params:**

- `user_id` : The ID of the places
- `place_id` : The ID of the places

**Example Request:**

- Get all places :

  `GET /places`
- Get place by ID :

    `GET /places?user_id=1&place_id=1`

**Example Response:**

```json
{
  "message": "success",
  "data": [
    {
      "City": "Jakarta",
      "Coordinate": "{'lat': -6.1753924, 'lng': 106.8271528}",
      "Description": "Monumen Nasional...",
      "Place_Name": "Monumen Nasional",
      "Lat": "-6.1753924",
      "Time_Minutes": "15",
      "Rating": "4.6",
      "Long": "106.8271528",
      "Price": "20000",
      "Place_Id": "1",
      "Category": "Budaya"
    },

    ...    
  ]
}
```

**Error Response (Invalid Query):**

```json
{
  "message": "invalid query",
  "data": []
}
```

## ML API

base URL: `http://predict.bangtour-ml.com/`

### Get Recommendation based on name

**Endpoint:** `/place-recommendations`

**Description:**  Retrieves similar places based on place name provided.

**Method:** POST

**Body Params:**

- `place_name` : The name of the place

**Example Request body:**

```json
{
  "place_name": "Monumen Nasional"
}
```

**Example Response:**

```json
{
    "message": "success",
    "data": [
        {
            "Category": "Budaya",
            "Place_Name": "Bandros City Tour"
        },

        ...
    ]
}
```

### Get Recommendation based on user rating

**Endpoint:** `/user-based-recommendation`

**Description:**  Retrieves similar places based on user rating provided in db.

**Method:** POST

**Body Params:**

- `user_id` : The user id

**Example Request body:**

```json
{
  "user_id": 1
}
```

**Example Response:**

```json
{
    "data": {
        "Place_Id": [
            294,
            296,
            297,
            284,
            276,
            303,
            281,
            285,
            279,
            302
        ]
    },
    "message": "success"
}
```
