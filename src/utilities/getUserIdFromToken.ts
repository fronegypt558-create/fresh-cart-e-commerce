import { jwtDecode } from "jwt-decode";

interface IJwtPayload {
  id: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}

export default function getUserIdFromToken(token: string): string | null {
  try {
    const decoded = jwtDecode<IJwtPayload>(token);

    return decoded.id || null; // ✅ هنا id هو المفتاح
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
}
