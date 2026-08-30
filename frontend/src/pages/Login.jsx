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

  // EMAIL/PASSWORD LOGIN OR REGISTER
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!email || !password) {
      setError("Please enter both email and password.");
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

        setTimeout(() => {
          navigate("/");
        }, 1000);

      } else {
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        navigate("/");
      }

    } catch (error) {
      console.error("Firebase Email Error:", error);

      // EXACT FIREBASE ERROR SHOW KARO
      setError(
        `${error.code}: ${error.message}`
      );

    } finally {
      setLoading(false);
    }
  };

  // GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      await signInWithPopup(
        auth,
        googleProvider
      );

      navigate("/");

    } catch (error) {
      console.error("Firebase Google Error:", error);

      // EXACT FIREBASE ERROR SHOW KARO
      setError(
        `${error.code}: ${error.message}`
      );

    } finally {
      setLoading(false);
    }
  };

  // FORGOT PASSWORD
  const handleForgotPassword = async () => {
    setError("");
    setMessage("");

    if (!email) {
      setError(
        "Please enter your email address first."
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
        "Password reset link sent successfully. Please check your email."
      );

    } catch (error) {
      console.error(
        "Firebase Password Reset Error:",
        error
      );

      // EXACT FIREBASE ERROR SHOW KARO
      setError(
        `${error.code}: ${error.message}`
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

          <h2>Interview Genie</h2>

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

            {/* EMAIL */}
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

            {/* PASSWORD */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
              minLength="6"
            />

            {/* FORGOT PASSWORD */}
            {!isRegister && (
              <button
                type="button"
                className="forgot-password"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </button>
            )}

            {/* LOGIN / CREATE ACCOUNT */}
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

          {/* DIVIDER */}
          <div className="divider">
            <span>OR</span>
          </div>

          {/* GOOGLE LOGIN */}
          <button
            type="button"
            className="google-login-btn"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <span className="google-icon">
              G
            </span>

            Continue with Google
          </button>

          {/* ERROR */}
          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          {/* SUCCESS */}
          {message && (
            <p className="login-success">
              {message}
            </p>
          )}

          {/* SWITCH LOGIN / REGISTER */}
          <p className="switch-account">

            {isRegister
              ? "Already have an account?"
              : "New here?"}

            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setError("");
                setMessage("");
                setEmail("");
                setPassword("");
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