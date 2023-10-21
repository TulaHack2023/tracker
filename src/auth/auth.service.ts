import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StringSession } from 'telegram/sessions';
import { Api, TelegramClient } from 'telegram';


@Injectable()
export class AuthService {
  private apiId: number;
  private apiHash: string;
  constructor(private configService: ConfigService) {
    this.apiId = Number(configService.getOrThrow('TG_API_ID'));
    this.apiHash = configService.getOrThrow('TG_API_HASH');
  }

  private connections: any = {};
  public async sendCode(phone: string) {
    const stringSession = new StringSession(''); // fill this later with the value from session.save()

    const client = new TelegramClient(
      stringSession,
      this.apiId,
      this.apiHash,
      {},
    );

    await client.connect();

    this.connections[phone] = client;
    const { phoneCodeHash } = await client.sendCode(
      {
        apiId: this.apiId,
        apiHash: this.apiHash,
      },
      phone,
    );

    return phoneCodeHash;
  }

  public async signIn(phone: string, phoneCodeHash: string, code: string) {
    const client = this.connections[phone] as TelegramClient;
    await client.connect();
    await client.invoke(
      new Api.auth.SignIn({
        phoneNumber: phone,
        phoneCodeHash: phoneCodeHash,
        phoneCode: code,
      }),
    );

    return client.session.save() as unknown as string;
  }

  public async me(session: string) {
    const stringSession = new StringSession(session); // fill this later with the value from session.save()

    const client = new TelegramClient(
      stringSession,
      this.apiId,
      this.apiHash,
      {},
    );

    await client.connect()

    const me =  await client.getMe() as Api.User

    return {
      name: me.firstName + " " + me.lastName,
      username: me.username,
    };
  }
}
