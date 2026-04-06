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

export function clearAuth() {
    localStorage.clear();
    sessionStorage.clear();
}

export function logout() {
    // 1️⃣ Save dark mode before clearing storage
    const darkMode =
        localStorage.getItem("darkMode") ||
        sessionStorage.getItem("darkMode");

    // 2️⃣ Clear auth data
    clearAuth();

    // 3️⃣ Restore dark mode
    if (darkMode !== null) {
        localStorage.setItem("darkMode", darkMode);
        sessionStorage.setItem("darkMode", darkMode);
    }

    // 4️⃣ Redirect to login
    window.location.replace("/login");
}

