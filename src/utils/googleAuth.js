// Google OAuth Configuration
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID_HERE";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://educational-society.onrender.com";

// Initialize Google Sign-In
export function initializeGoogleSignIn() {
  if (window.google) {
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: (response) => {
        console.log("Google Sign-In Response:", response);
        // This will be handled by components
      }
    });
  }
}

// Handle Google Sign-In Token
export async function handleGoogleSignIn(response, isSignUp = false) {
  try {
    if (!response.credential) {
      throw new Error("No credential received from Google");
    }

    const endpoint = isSignUp ? "/api/auth/google-signup" : "/api/auth/google-login";
    
    const result = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: response.credential
      })
    });

    const data = await result.json();

    if (!result.ok) {
      throw new Error(data.error || "Authentication failed");
    }

    // Store auth data in session storage for session-based route checks.
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("user", JSON.stringify(data.user));

    // Prevent stale auth precedence from previous local storage sessions.
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return {
      success: true,
      user: data.user,
      token: data.token,
      role: data.user.role
    };
  } catch (error) {
    console.error("Google Auth Error:", error);
    throw error;
  }
}

// Render Google Sign-In Button
export function renderGoogleSignInButton(containerId, isSignUp = false) {
  if (window.google) {
    window.google.accounts.id.renderButton(
      document.getElementById(containerId),
      {
        theme: "outline",
        size: "large",
        width: "100%",
        text: isSignUp ? "signup_with" : "signin_with"
      }
    );
  }
}
