import { Injectable } from '@nestjs/common';
import { UserEntity, UserService } from 'src/user';
import { CredentialsDTO } from './dto/credentials.dto';
import * as jose from 'jose';
import { plainToInstance } from 'class-transformer';
import { AuthenticatedUserDTO } from './dto/authenticated-user.dto';

//  In this example authentication is implemented in a simplified form (by only email and long-lived access token), in real application use another approach with password, access and refresh JWT, sessions and etc.

@Injectable()
export class AuthService {
  private readonly key = new TextEncoder().encode('215900asa11af40esa89b73');
  private readonly alg = 'HS256';
  constructor(private userService: UserService) {}

  public async signIn(credentialsDto: CredentialsDTO) {
    const user = await this.userService.findOne(credentialsDto);
    const accessToken = await this.signJwt(user);
    return { accessToken };
  }

  private async signJwt(user: UserEntity) {
    return await new jose.SignJWT({ ...user })
      .setProtectedHeader({ alg: this.alg })
      .setExpirationTime('1d')
      .sign(this.key);
  }

  public async verifyJwt(token: string) {
    try {
      const { payload } = await jose.jwtVerify(token, this.key);
      return plainToInstance(AuthenticatedUserDTO, payload, {
        strategy: 'excludeAll',
        enableImplicitConversion: true,
      });
    } catch (error) {
      return null;
    }
  }
}
