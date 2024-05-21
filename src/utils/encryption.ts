import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.JWT_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10 minutes")
    .sign(key);
}

export async function decrypt(token: string): Promise<any> {
  return await jwtVerify(token, key, { algorithms: ["HS256"] });
}
