"use client";

import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Signup() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [pwdError, setPwdError] = useState("");
  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const validateForm = () => {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    let isValid = true;

    if (!emailRegex.test(email)) {
      setEmailError("Enter valid lowercase email");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!passwordRegex.test(password)) {
      setPwdError(
        "Password must contain 8 chars and atleast 1 uppercase, number & special character",
      );
      isValid = false;
    } else {
      setPwdError("");
    }

    return isValid;
  };

  const handleSignup = async () => {
    setEmailError("");
    setPwdError("");
    setSuccess("");

    if (!validateForm()) return;

    setLoading(true);

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
            fullWidth
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
            error={Boolean(emailError)}
            helperText={emailError}
          />

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPwdError("");
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(pwdError)}
            helperText={pwdError}
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
