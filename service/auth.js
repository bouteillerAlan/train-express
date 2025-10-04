import * as jose from "jose";

export default class AuthService {
  static getSecret = () => {
    const varSecret = process.env.JWT_SECRET;
    if (!varSecret) throw new Error("no jwt secret");
    return varSecret;
  }

  static buildJwt = async (payload) => {
    const alg = "HS256";
    if (!(payload instanceof Object)) throw new Error("payload nust be an Object");
    const secret = new TextEncoder().encode(this.getSecret());
    return new jose.SignJWT(payload)
      .setProtectedHeader({ alg })
      .setIssuedAt(Date.now())
      .setIssuer("urn:example:issuer")
      .setAudience("urn:example:audience")
      .setExpirationTime("2h")
      .sign(secret);
  }

  static verifyJwt = async (jwt) => {
    if (typeof jwt !== "string") throw new Error("jwt nust be a string");
    const secret = new TextEncoder().encode(this.getSecret());
    return jose.jwtVerify(jwt, secret);
  }
}
