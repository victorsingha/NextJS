import jwt from 'jsonwebtoken';

const key = process.env.TOKEN_KEY || "4nbiu$%$2c67r7#GH@!gr2^%FGVC#RT@S@"

export default function generateAccessToken(obj:any) {
    return jwt.sign(obj, key, { expiresIn: '6400s' });
  }


export function  authenticateToken(req:any, res:any, next:any) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.status(401).send({StatusCode:'F',StatusMessage:"Unauthorized"});
  
    jwt.verify(token, key, (err:any,obj:any) => {
      if (err) return res.status(403).send({StatusCode:'F',StatusMessage:"Forbidden"});
      req=obj
      next()
    })
  }
