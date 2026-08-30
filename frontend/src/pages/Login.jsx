import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import {
  auth,
  googleProvider,
} from "../firebase";

import {
  Sparkles,
  Brain,
  Target,
  MessageSquare,
} from "lucide-react";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      if (isRegister) {
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        setMessage("Account created successfully!");
        navigate("/");
      } else {
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        navigate("/");
      }
    } catch (error) {
      console.error(error);

      if (error.code === "auth/email-already-in-use") {
        setError(
          "This email is already registered. Please login."
        );
      } else if (error.code === "auth/invalid-credential") {
        setError("Invalid email or password.");
      } else if (error.code === "auth/weak-password") {
        setError(
          "Password must contain at least 6 characters."
        );
      } else {
        setError(
          "Something went wrong. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      await signInWithPopup(
        auth,
        googleProvider
      );

      navigate("/");
    } catch (error) {
      console.error(error);
      setError(
        "Google sign in failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    setMessage("");

    if (!email) {
      setError(
        "Please enter your email first, then click Forgot Password."
      );
      return;
    }

    try {
      setLoading(true);

      await sendPasswordResetEmail(
        auth,
        email
      );

      setMessage(
        "Password reset link has been sent to your email."
      );
    } catch (error) {
      console.error(error);

      setError(
        "Unable to send password reset email."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* LEFT SIDE */}
      <div className="login-left">

        <div className="login-brand">
          <div className="brand-icon">
            <Sparkles size={20} />
          </div>

          <h2>AI Interview Coach</h2>
        </div>

        <div className="login-content">

          <span className="login-tag">
            AI-POWERED INTERVIEW PREPARATION
          </span>

          <h1>
            Ace Your Next
            <br />
            <span>Interview</span>
          </h1>

          <p>
            Practice smarter, receive personalized AI feedback,
            and build confidence for your dream job.
          </p>

          <div className="login-features">

            <div>
              <Brain size={20} />
              <span>AI Generated Questions</span>
            </div>

            <div>
              <Target size={20} />
              <span>Personalized Feedback</span>
            </div>

            <div>
              <MessageSquare size={20} />
              <span>Detailed Performance Analysis</span>
            </div>

          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">

        <div className="login-card">

          <h2>
            {isRegister
              ? "Create Account"
              : "Welcome!"}
          </h2>

          <p>
            {isRegister
              ? "Create your account to start your interview preparation journey."
              : "Sign in to start your interview preparation journey."
            }
          </p>

          <form onSubmit={handleSubmit}>

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            {!isRegister && (
              <button
                type="button"
                className="forgot-password"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </button>
            )}

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : isRegister
                ? "Create Account"
                : "Login"}
            </button>

          </form>

          <div className="divider">
            <span>OR</span>
          </div>

          <button
            className="google-login-btn"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <span className="google-icon">
              G
            </span>

            Continue with Google
          </button>

          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          {message && (
            <p className="login-success">
              {message}
            </p>
          )}

          <p className="switch-account">
            {isRegister
              ? "Already have an account?"
              : "New here?"}

            <button
              onClick={() => {
                setIsRegister(!isRegister);
                setError("");
                setMessage("");
              }}
            >
              {isRegister
                ? " Login"
                : " Create an account"}
            </button>
          </p>

        </div>
      </div>

    </div>
  );
};

export default Login;