import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    sub: { id: number };
}

export function getUserId(): number | null {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded.sub.id;
    } catch {
        return null;
    }
}
