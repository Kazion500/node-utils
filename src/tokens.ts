import * as jose from "jose";

interface BaseTokenOptions {
  /*
   * secret: Secret key for the token.
   * If not specified, the default is the value of the SECRET_KEY environment variable.
   * value format: 7d, 1h, 30m, 30s, 1000ms
   */
  secret: string;
}

interface CreateTokenOption extends BaseTokenOptions {
  /*
   * exp: Expiration time for the token.
   * If not specified, the default is 7 days.
   * value format: 7d, 1h, 30m, 30s, 1000ms
   */
  exp?: string;
}

export const createJWT = async (userId: string, opt: CreateTokenOption) => {
  if (!opt.secret) {
    throw new Error("secret must be provided");
  }
  const token = await new jose.SignJWT({ uid: userId })
    .setProtectedHeader({ alg: (process.env.ALGO as string) || "HS256" })
    .setIssuedAt()
    .setExpirationTime(opt?.exp || "7d")
    .sign(new TextEncoder().encode(process.env.SECRET_KEY || opt.secret));
  return token;
};

export const verifyJWT = async (token: string, opt: BaseTokenOptions) => {
  try {
    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.SECRET_KEY || opt.secret)
    );
    return payload as { uid: string };
  } catch (error) {
    throw new Error("JWT has expired");
  }
};

export const decodeJWT = (token: string) => {
  const decoded = jose.decodeJwt(token);
  return decoded as { uid: string };
};
