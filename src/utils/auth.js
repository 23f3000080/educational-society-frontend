import api from "../services/axios.js";
const INVALID_TOKEN_VALUES = new Set(["", "null", "undefined"]);

const normalizeToken = (token) => {
    if (token == null) return null;
    const value = String(token).trim();
    return INVALID_TOKEN_VALUES.has(value) ? null : value;
};

const parseStoredUser = (rawValue) => {
    if (!rawValue) return null;
    try {
        const parsed = JSON.parse(rawValue);
        return parsed && typeof parsed === "object" ? parsed : null;
    } catch (_err) {
        return null;
    }
};

export const normalizeRole = (role) => {
    const roleValue = String(role || "").toLowerCase();
    if (roleValue === "user") return "student";
    return roleValue || null;
};

export function getAuth() {
    const token = normalizeToken(
        localStorage.getItem("token") || sessionStorage.getItem("token")
    );

    const user =
        parseStoredUser(localStorage.getItem("user")) ||
        parseStoredUser(sessionStorage.getItem("user"));

    if (!token) {
        return { token: null, user: null };
    }

    return { token, user };
}

export function getEnrollmentRoute(courseId) {
    const { token } = getAuth();
    const targetRoute = `/courses/${courseId}/enroll`;

    if (token) {
        return targetRoute;
    }

    return `/login?redirect=${encodeURIComponent(targetRoute)}`;
}

export function clearAuth() {
    localStorage.clear();
    sessionStorage.clear();
}

export async function logout() {
    // 1️⃣ Save dark mode before clearing storage
    const darkMode =
        localStorage.getItem("darkMode") ||
        sessionStorage.getItem("darkMode");

    try {
        // 2️⃣ Get JWT token
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");

        // 3️⃣ Notify backend about logout
        if (token) {
            await api.post(
                "/api/auth/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        contentType: "application/json"
                    }
                }
            );
        }

    } catch (error) {
        console.error("Logout API failed:", error);

    } finally {
        // 4️⃣ Clear authentication data
        stopHeartbeat();
        clearAuth();

        // 5️⃣ Restore dark mode
        if (darkMode !== null) {
            localStorage.setItem("darkMode", darkMode);
            sessionStorage.setItem("darkMode", darkMode);
        }

        // 6️⃣ Redirect to login
        window.location.replace("/login");
    }
}

let heartbeatTimer = null;
let heartbeatRunning = false;

const HEARTBEAT_INTERVAL = 2 * 60 * 1000; // 2 minutes

async function sendHeartbeat() {
    const { token } = getAuth();

    // No logged-in user
    if (!token) {
        stopHeartbeat();
        return;
    }

    try {
        await api.get(
            "/api/heartbeat",
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    contentType: "application/json"
                }
            }
        );

        console.log("💓 Heartbeat sent");
    } catch (error) {
        console.error(
            "Heartbeat failed:",
            error.response?.data || error.message
        );
    }
}

export function startHeartbeat() {
    // Prevent multiple heartbeat timers
    if (heartbeatRunning) {
        console.log("Heartbeat already running");
        return;
    }

    heartbeatRunning = true;

    console.log("💓 Heartbeat started");

    // Send immediately
    sendHeartbeat();

    // Then every 2 minutes
    heartbeatTimer = setInterval(() => {
        sendHeartbeat();
    }, HEARTBEAT_INTERVAL);
}

export function stopHeartbeat() {
    if (heartbeatTimer) {
        clearInterval(heartbeatTimer);
        heartbeatTimer = null;
    }

    heartbeatRunning = false;

    console.log("💔 Heartbeat stopped");
}

