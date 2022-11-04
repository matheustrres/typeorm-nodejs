import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';
import { ProfileAccountType } from '@/src/shared/infra/typeorm/entities/profile.entity';

const authConfig: config.IConfig = config.get('app.auth');

const md5HashKey: string = authConfig.get('key');

interface JwtPayload extends SignTokenOptions {
  iat: number;
  exp: number;
  sub: string;
}

interface SignTokenOptions {
  id: string;
  accountType?: ProfileAccountType;
  studentId?: string;
}

export class AuthProvider {
  public static async hashPassword(password: string, salt: number = 9): Promise<string> {
    return bcrypt.hash(password, salt);
  }
  
  public static async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
  
  public static signToken(options: SignTokenOptions): string {
    return jwt.sign({
      accountType: options.accountType,
      studentId: options.accountType === 'student' && (options.studentId ?? null)
    }, md5HashKey, {
      subject: options.id,
      expiresIn: authConfig.get('tokenExpiresIn')
    });
  }
  
  public static decodeToken(token: string, key: string = md5HashKey): JwtPayload {
    return jwt.verify(token, key) as JwtPayload;
  }
}