"use client";

import { Button, Card, CardContent, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-6">
      <div className="">
        <Card className="w-full shadow-xl rounded-2xl py-8 max-w-2xl">
          <CardContent className="flex flex-col items-center gap-6 text-center p-10">
            <Typography
              variant="h4"
              fontWeight="bold"
              className="text-gray-800"
            >
              Task Manager Dashboard
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              className="max-w-md"
            >
              Organize your projects and manage tasks efficiently. Create
              projects, add tasks, and track their progress in one place.
            </Typography>

            <div className="w-full flex flex-row gap-[20px] mt-[20px] justify-center items-center">
              <Button
                className="w-auto"
                variant="contained"
                size="large"
                onClick={() => router.push("/login")}
              >
                Login
              </Button>

              <Button
                className="w-auto"
                variant="outlined"
                size="large"
                onClick={() => router.push("/signup")}
              >
                Create Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
