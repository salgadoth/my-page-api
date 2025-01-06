import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrpyt from 'bcrypt';

interface Payload {
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<Payload> {
    if (!username || !pass) {
      throw new BadRequestException('Username or password not provided.');
    }
    const user = await this.usersService.findCredentials(username);

    if (!bcrpyt.compare(pass, user.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
