"use client";

import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.token) {

        /* ---------------- REDUX GLOBAL STATE ---------------- */

        dispatch(
          login({
            user: { email },
            token: data.token,
          })
        );

        /* ---------------- LOCAL STORAGE ---------------- */

        localStorage.setItem("token", data.token);

        router.push("/dashboard");

      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">

      <Card className="w-full md:w-1/2 max-w-md shadow-xl rounded-2xl">

        <CardContent className="flex flex-col gap-2 p-8">

          <div className="text-center">
            <Typography variant="h5" fontWeight="bold">
              Welcome Back
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Login to your Task Manager
            </Typography>
          </div>

          <div className="my-2">

            <TextField
              label="Email"
              type="email"
              fullWidth
              className="!pb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          </div>

          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            size="large"
            onClick={handleLogin}
            disabled={loading || !email || !password}
            className="py-3"
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Login"
            )}
          </Button>

          <Typography
            variant="body2"
            textAlign="center"
            color="text.secondary"
            className="!mt-[10px]"
          >
            Don&apos;t have an account?{" "}
            <span
              className="text-blue-600 font-medium ml-1 cursor-pointer hover:underline"
              onClick={() => router.push("/signup")}
            >
              Sign up
            </span>
          </Typography>

        </CardContent>
      </Card>
    </div>
  );
}