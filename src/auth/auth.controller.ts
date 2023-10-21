import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { CodeDto } from './dto/code.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    const user = await this.usersService.create(
      new CreateUserDto({
        ...registerUserDto,
        name: '',
        tg_name: '',
        tg_session: '',
      }),
    );

    const phoneCodeHash = await this.authService.sendCode(registerUserDto.tel);
    return {
      ok: true,
      userId: user.id,
      phoneCodeHash,
    };
  }

  @Post('code')
  async code(@Body() codeDto: CodeDto) {
    let user = await this.usersService.findById(codeDto.id);

    const session = await this.authService.signIn(
      user.tel,
      codeDto.phoneCodeHash,
      codeDto.code,
    );

    await this.usersService.updateTgSession(user, session);
    const me = await this.authService.me(session)
    user.tg_name = me.username
    user.name = me.name

    await this.usersService.update(user.id, user)
    return {
      ok: true,
    };
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.usersService.findByCredentials(
      loginUserDto.tel,
      loginUserDto.password,
    );

    if (!user.tg_session) {
      const phoneCodeHash = await this.authService.sendCode(user.tel);

      return {
        ok: true,
        code: true, // Флаг для фронта
        data: {
          id: user.id,
          phoneCodeHash,
        },
      };
    }

    const payload = { sub: user.id, tel: user.tel };

    return {
      ok: true,
      code: false, // Флаг для фронта
      data: {
        token: await this.jwtService.signAsync(payload),
        user,
      },
    };
  }
}
