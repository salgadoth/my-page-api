import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/config/metadata';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signin(@Body() signInDto: Record<string, any>, @Res() response) {
    const token = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );

    response.cookie('access_token', token.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
    });

    return response.status(HttpStatus.OK).json({ message: 'Login Successful' });
  }
}
