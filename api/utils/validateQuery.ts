
import { NextApiRequest, NextApiResponse } from "next";

export default function validateQuery (queryList: string[], req: NextApiRequest){
  let valid = false;
  if (Object.keys(req.query).length != 0 ) {

    for (let i = 0; i < queryList.length; i++) {
        // if the query is not valid, return error
        if (req.query[queryList[i]] == null) {
          valid = false
        }else{
          // console.log(req.query)
          valid = true;
          break
        }
    }
    return valid
  } else {
    valid=true;
    return valid
  }
}