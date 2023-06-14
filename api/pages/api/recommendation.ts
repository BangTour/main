import type { NextApiRequest, NextApiResponse } from 'next'

import allowCors from '@/utils/cors'

async function handler(req: NextApiRequest, res: NextApiResponse){


}

export default allowCors(handler)