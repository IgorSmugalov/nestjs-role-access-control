import { AuthenticatedUserDTO } from 'src/auth/dto/authenticated-user.dto';

export {};

declare global {
  namespace Express {
    export interface Request {
      user: AuthenticatedUserDTO | null;
    }
  }
}
