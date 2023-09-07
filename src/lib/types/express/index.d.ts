import { AuthenticatedUserDTO } from 'src/auth';

export {};

declare global {
  namespace Express {
    export interface Request {
      user: AuthenticatedUserDTO | null;
    }
  }
}
