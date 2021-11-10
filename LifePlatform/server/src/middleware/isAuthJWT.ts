import { MiddlewareFn } from 'type-graphql'
import { verify } from 'jsonwebtoken'
import { MyContext } from '../types'

export const isAuthJWT: MiddlewareFn<MyContext> = ({ context }, next) => {
  
  const authorization = context.req.headers['authorization']

 

  if (!authorization) {

    console.log("context.req.headers",context.req.headers)

    throw new Error('Not authenticated')
  }

  try {
    const token = authorization.split(' ')[1]    
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    console.log("payload in jwtauthmiddleware; ", payload);
    context.payload = payload as any
  } catch (e) {
    console.log(e)
    throw new Error('Not authenticated')
  }
  return next()
}