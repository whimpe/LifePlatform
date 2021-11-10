import { MiddlewareFn } from 'type-graphql'
import { verify } from 'jsonwebtoken'
import { MyContext } from '../types'

export const MaintenanceMiddleWare: MiddlewareFn<MyContext> = ({ context }, next) => {


  
  const MaintenancePassword = context.req.headers['maintenancepassword']
  //word naar lower gezet

 

  if (!MaintenancePassword) {
    throw new Error('Not rights')
  }

  if(MaintenancePassword === process.env.MAINTENANCE_PASSWORD){
    return next()
  }else{
    throw new Error('Not authenticated')
  }
 
  
}