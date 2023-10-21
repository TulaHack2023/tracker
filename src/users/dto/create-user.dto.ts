export class CreateUserDto {
  tel: string;
  password: string;
  name: string;
  tg_name: string;
  tg_session: string;

  constructor(dto: Partial<CreateUserDto>) {
    Object.assign(this, dto);
  }
}
