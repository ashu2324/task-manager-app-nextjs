import { Project } from "@/types";

const projects: Project[] = [];

export async function GET() {
  return Response.json(projects);
}

export async function POST(req: Request) {
  const body = await req.json();

  const project = {
    id: Date.now(),
    name: body.name,
    description: body.description,
    dueDate: body.dueDate,
  };

  projects.push(project);

  return Response.json(project);
}
