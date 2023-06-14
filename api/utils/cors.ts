import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";


const allowCors = (handler: NextApiHandler) => (req: NextApiRequest, res:NextApiResponse) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET,OPTIONS,PATCH,DELETE,POST,PUT'
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With, Accept, Content-Type, Authorization'
    );
  
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
  
    return handler(req, res);
  };
  
  export default allowCors;
  