import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export default class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'accessToken',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  validate(decodedToken) {
    try {
      const user = {
        userId: decodedToken?.userId,
        username: decodedToken?.username,
      };
      return user;
    } catch (error) {
      throw new UnauthorizedException('Authentication failed');
    }
  }
}
