// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { initializeApp } from "firebase/app";
import { getFirestore, where } from "firebase/firestore";
import { doc, setDoc, addDoc, collection, getDocs, query } from "firebase/firestore"; 

import { firebaseConfig } from '@/utils/cofig'
import validateQuery from '@/utils/validateQuery';

type responseType = {
  message: string,
  data: any[]
}

const c = "tourism_with_id"

const app = initializeApp(firebaseConfig);

const db = getFirestore();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseType>
) {
  // check if the request is a GET request
  if (req.method === 'GET') {
    // get the query string from the request
    const req_query = req.query;

    // // check query fields uncomment to use it
    // console.log(req_query)

    const validate_q = ["id"]

    // validate the query string
    validateQuery(validate_q, req, res)

    // if there is no query string, get all
    if ( req_query == null || req_query.id == null) {
      let dt = []
      // get all the places from the database
      const places = await getDocs(collection(db, c));
      places.forEach((doc) => {
        dt.push(doc.data())

        // // check if get success or not, uncomment for use
        // console.log(doc.id)
      });

      // return the places
      res.status(200).json({
        message: "success",
        data: dt
      });

    }
    
    // get the collection of places from the database
    else
    {
      let dt = [];

      const q = query(collection(db, c), where("Place_Id", "==", req_query.id))
      // get all the places from the database
      const places = await getDocs(q);
      places.forEach((doc) => {
        dt.push(doc.data())

        // // check id uncomment for use
        // console.log(doc.id)
      });
      // return the places
      res.status(200).json({
        message: "success",
        data: dt
      });

    }

  // check if the request is a POST reques
  }else if (req.method === 'POST') {

    // get the body from the request
    const req_body = req.body;

    // // check body fields uncomment to use it
    console.log(req_body)

    // add the place to the database
    const docRef = await addDoc(collection(db, c), req_body);

    // return the id of the added place
    res.status(200).json({
      message: "Placeholder for POST request",
      data: []
    });
  }
}

  
