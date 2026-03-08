import { users } from "@/utils/storage"

export async function POST(req: Request){

 const body = await req.json()

 const user = {
   id: Date.now(),
   email: body.email,
   password: body.password
 }

 users.push(user)
  
 return Response.json({
   message: "User created"
 })
}