import { users } from "@/utils/storage";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const body = await req.json();

  const user = users.find(
    (u) => u.email === body.email && u.password === body.password,
  );

  if (!user) {
    return Response.json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, "secret", {
    expiresIn: "1h",
  });

  return Response.json({ token });
}
