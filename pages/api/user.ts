// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConfig from '../../service/dbConfig';
import sql from 'mssql/msnodesqlv8';
import { generateAccessToken } from '../../service/jwt';

export default async function handler(req: NextApiRequest, res: NextApiResponse,) {
    let pool = await sql.connect(dbConfig());
    let request = req.body;
    console.log(request)
    await pool.request()
        .input("User", sql.VarChar, request.email)
        .input("IsVerified", sql.Bit, request.password)
        .execute("SPR_GetAllUsers").then(result => {
                // res.send(result.recordset)
                let obj = {
                    email:request.email,
                }
                const token = generateAccessToken(obj)
                res.status(200).json({Token:token,Data:result.recordset})
        })
    // res.status(200).json({ name: 'John Doe' })
}
