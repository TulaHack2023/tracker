import { Injectable } from '@nestjs/common';
import { NotificationsService } from '../notifications-service';
import { TelegramService as TGService } from 'nestjs-telegram';

@Injectable()
export class TelegramService implements NotificationsService {
  constructor(private readonly telegram: TGService) {}
  public createRoom(name: string, nicks: string[]) {}

  public send(to: string, message: string): void {
    //
  }
}
