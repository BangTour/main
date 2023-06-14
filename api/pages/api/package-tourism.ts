// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { initializeApp } from "firebase/app";
import { getFirestore, where } from "firebase/firestore";
import {collection, getDocs, query } from "firebase/firestore"; 

import { firebaseConfig } from '@/utils/cofig'
import validateQuery from '@/utils/validateQuery'

type responseType = {
  message: string,
  data: any[]
}


const app = initializeApp(firebaseConfig);

const c = "package_tourism"

const db = getFirestore();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseType>
) {

  // check if the request is a GET request
  if (req.method === 'GET') {
    // get the query string from the request
    const req_query = req.query;

    // check query fields uncomment to use it
    // console.log(req_query)

    // validate the query string
    const validate_q = ["id"]
    validateQuery(validate_q, req, res)

    // if there is no query string, get all
    if ( req_query == null || req_query.id == null) {
      let dt = []
      // get all the places from the database
      const places = await getDocs(collection(db, c));
      places.forEach((doc) => {
        dt.push(doc.data())
        console.log(doc.id)
      });

      // return the places
      res.status(200).json({
        message: "success",
        data: dt
      });
    // get the collection of places from the database
    }else 
    {
      let dt = []
      const q = query(collection(db, c), where("Package", "==", req_query.id))
      // get all the places from the database
      const places = await getDocs(q);
      places.forEach((doc) => {
        dt.push(doc.data())

        // // check for success or not, uncomment for use
        // console.log(doc.id)
      });

      // return the places
      res.status(200).json({
        message: "success",
        data: dt
      });
    }

    // check if the request is not valid
  } else {
    res.status(400).json({
      message: "Error Method Not Allowed",
      data: []
    });    
  }
}