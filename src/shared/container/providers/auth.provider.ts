import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';

const authConfig: config.IConfig = config.get('app.auth');

const md5HashKey: string = authConfig.get('key');

interface JwtPayload {
  sub: string;
}

export class AuthProvider {
  public static async hashPassword(password: string, salt: number = 9): Promise<string> {
    return bcrypt.hash(password, salt);
  }
  
  public static async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
  
  public static signToken(studentId: string): string {
    return jwt.sign({}, md5HashKey, {
      subject: studentId,
      expiresIn: authConfig.get('tokenExpiresIn')
    });
  }
  
  public static decodeToken(token: string, key: string = md5HashKey): JwtPayload {
    return jwt.verify(token, key) as JwtPayload;
  }
}