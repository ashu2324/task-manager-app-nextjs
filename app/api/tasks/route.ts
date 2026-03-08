import { Task } from "@/types"

const tasks: Task[] = []

export async function GET() {
 return Response.json(tasks)
}

export async function POST(req: Request) {

 const body = await req.json()

 const task: Task = {
  id: Date.now(),
  title: body.title,
  projectId: body.projectId,
  status: "todo"
 }

 tasks.push(task)

 return Response.json(task)
}

export async function PUT(req: Request) {

 const body = await req.json()

 const index = tasks.findIndex(
  (t) => t.id === body.id
 )

 if (index !== -1) {
  tasks[index].status = body.status
 }

 return Response.json(tasks[index])
}

export async function DELETE(req: Request) {

 const body = await req.json()

 const index = tasks.findIndex(
  (t) => t.id === body.id
 )

 if (index !== -1) {
  tasks.splice(index, 1)
 }

 return Response.json({ success: true })
}