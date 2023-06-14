// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { initializeApp } from "firebase/app";
import { QuerySnapshot, and, getFirestore, or, where } from "firebase/firestore";
import { doc, setDoc, addDoc, collection, getDocs, query } from "firebase/firestore"; 

import { firebaseConfig } from '@/utils/cofig'
import allowCors from '@/utils/cors';
import validateQuery from '@/utils/validateQuery';

type responseType = {
  message: string,
  data: any[]
}

const c = "tourism_rating"

const app = initializeApp(firebaseConfig);

const db = getFirestore();

 async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseType>
) {
  
  // check if the request is a GET request
  if (req.method === 'GET') {

    // get the query string from the request
    const req_query = req.query;

    // // // check query fields uncomment to use it
    // console.log(req_query)
    
    
    // validate the query string
    const validate_q = ["place_id", "user_id"]

    let valid = await validateQuery(validate_q, req)

    console.log(valid)
    if(!valid){
      res.status(400).json({
        message: "invalid query",
        data: []
      });
      return;
    }

    // if there is no query string, get all
    if ( req_query == null ||( req_query.user_id == null && req_query.place_id == null)) {
      let dt: object[] = []
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
    // get the collection of places from the database by place_id
    else if ( req_query.user_id == null)
    {
      let dt: object[] = []

      const q = query(collection(db, c), where("Place_Id", "==", req_query.place_id))
      // get all the places from the database
      const places = await getDocs(q);
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
    // get the collection of places from the database by user_id
    else if ( req_query.place_id == null)
    {
      let dt: object[] = []

      const q = query(collection(db, c), where("User_Id", "==", req_query.user_id))
      // get all the places from the database
      const places = await getDocs(q);
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
    // get the collection of places from the database by user_id and place_id
    else 
    {
      let dt: object[] = []

      const q = query(collection(db, c),and (
        where("User_Id", "==", req_query.user_id), 
        where("Place_Id", "==", req_query.place_id)
        )
      )
      // get all the places from the database
      const places = await getDocs(q);
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
  }


}

export default allowCors(handler)