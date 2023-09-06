import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDTO } from './dto/credentials.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthResponseDTO } from './dto/auth-response.dto';

// In this example authentication is implemented in a simplified form (by only email and long-lived access token), in real application use another approach with password, access and refresh JWT, sessions and etc.

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiCreatedResponse({ type: AuthResponseDTO })
  async signIn(@Body() credentialsDto: CredentialsDTO) {
    return await this.authService.signIn(credentialsDto);
  }
}
