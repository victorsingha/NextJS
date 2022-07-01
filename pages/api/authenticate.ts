// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { authenticateToken } from '../../service/jwt'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  next:any
) {

    let result = authenticateToken(req,res,next)

    res.send(result)

//   res.status(200).json({ name: 'John Doe' })
}
