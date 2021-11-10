import { MiddlewareFn } from 'type-graphql'
import { verify } from 'jsonwebtoken'
import { MyContext } from '../types'

export const isAuthJWTIndexPage: MiddlewareFn<MyContext> = ({ context }, next) => {
  
  const authorization = context.req.headers['authorization']

  // console.log("context.req.headers  ",context.req.headers);
  // console.log("authorization:  ",authorization);

  if (!authorization) {
    return next()
  }

  try {
    // console.log("authorization in jwtAuth" , authorization);
    const token = authorization.split(' ')[1]
    
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    console.log("payload in jwtauthmiddleware; ", payload);
    context.payload = payload as any
  } catch (e) {
    console.log(e)
    throw new Error('Something went wrong')
  }
  return next()
}