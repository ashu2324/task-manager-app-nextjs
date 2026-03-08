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

export default function Signup() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async () => {

    setLoading(true);
    setError("");
    setSuccess("");

    try {

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.message) {

        setSuccess("Account created successfully. Redirecting to login...");

        setTimeout(() => {
          router.push("/login");
        }, 1500);

      } else {
        setError("Signup failed");
      }

    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">

      <Card className="w-full md:w-1/2 max-w-md shadow-xl rounded-2xl">

        <CardContent className="flex flex-col gap-3 p-8">

          <div className="text-center">
            <Typography variant="h5" fontWeight="bold">
              Create Account
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Signup to start managing your tasks
            </Typography>
          </div>

          <TextField
            label="Email"
            type="email"
            className="!pb-4"
            fullWidth
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

          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}

          {success && (
            <Typography color="success.main" variant="body2">
              {success}
            </Typography>
          )}

          <Button
            variant="contained"
            size="large"
            onClick={handleSignup}
            disabled={loading || !email || !password}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Signup"
            )}
          </Button>

          <Typography variant="body2" textAlign="center" color="text.secondary">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer ml-1 hover:underline"
              onClick={() => router.push("/login")}
            >
              Login
            </span>
          </Typography>

        </CardContent>
      </Card>
    </div>
  );
}