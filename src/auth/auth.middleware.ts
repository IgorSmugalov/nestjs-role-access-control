import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { isJWT } from 'class-validator';

@Injectable()
export class AccessJwtAuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: Request, res: Response, next: () => void) {
    req.user = null;
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) return next();
    const [bearer, token] = authorizationHeader.split(' ');
    if (bearer !== 'Bearer' || !isJWT(token)) return next();
    req.user = await this.authService.verifyJwt(token);
    return next();
  }
}
