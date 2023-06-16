import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateToken(userId: string, scopes: string[]): Promise<string> {
    const payload: JwtPayload = { userId, scopes };
    const options = {
      expiresIn: this.configService.get('jwt.expiresIn'),
    };
    return this.jwtService.signAsync(payload, options);
  }

  async validateUser(payload: JwtPayload): Promise<any> {
  
    return null;
  }
}
