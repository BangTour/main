
import { NextApiRequest, NextApiResponse } from "next";

export default function validateQuery (queryList: string[], req: NextApiRequest, res: NextApiResponse ){
    if (req.query != null) {
        queryList.forEach((query) => {
          
          // if the query is not valid, return error
          if (req.query[query] == null) {
            res.status(400).json({
              message: "invalid query",
              data: []
            });
            return;
          }
        });
      }

}