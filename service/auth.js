import * as jose from "jose";

export default class AuthService {
  static getSecret = () => {
    const varSecret = process.env.JWT_SECRET;
    if (!varSecret.trim()) throw new Error("no jwt secret");
    return varSecret;
  }

  static buildJwt = async (payload) => {
    if (!(payload instanceof Object)) throw new Error("payload must be an Object");
    const secret = new TextEncoder().encode(this.getSecret());
    return new jose.SignJWT(payload)
      .setProtectedHeader({"alg": "HS256"})
      .setIssuedAt()
      .setIssuer('urn:example:issuer')
      .setAudience('urn:example:audience')
      .setExpirationTime("2h")
      .sign(secret)
      .then((res) => res)
      .catch((err) => {
        console.error(err);
        return null;
      });
  }

  static verifyJwt = async (jwt) => {
    if (typeof jwt !== "string" || !jwt.trim()) throw new Error("jwt must be a string");
    const secret = new TextEncoder().encode(this.getSecret());
    return jose.jwtVerify(jwt, secret, {
        issuer: 'urn:example:issuer',
        audience: 'urn:example:audience'
      })
      .then((res) => res.payload)
      .catch((err) => {
        console.error(err);
        return null;
      });
  }
}
