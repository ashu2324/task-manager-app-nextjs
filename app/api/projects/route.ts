import { Project } from "@/types";
import { NextResponse } from "next/server";

let projects: Project[] = [];

export async function GET() {
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  const body = await req.json();

  const newProject = {
    id: Date.now(),
    name: body.name,
    description: body.description,
    dueDate: body.dueDate,
  };

  projects.push(newProject);

  return NextResponse.json(newProject);
}

export async function PUT(req: Request) {
  const body = await req.json();

  const index = projects.findIndex((p) => p.id === body.id);

  if (index !== -1) {
    projects[index] = {
      ...projects[index],
      name: body.name,
      description: body.description,
      dueDate: body.dueDate,
    };
  }

  return NextResponse.json(projects[index]);
}

export async function DELETE(req: Request) {
  const body = await req.json();

  projects = projects.filter((p) => p.id !== body.id);

  return NextResponse.json({
    message: "Project deleted",
  });
}
