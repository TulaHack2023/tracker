import { Module } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { TelegramModule as TGModule } from 'nestjs-telegram';
import { TelegramModule } from './telegram/telegram.module';

@Module({
  imports: [
    TGModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        botKey: configService.get('TG_API_KEY'),
      }),
      inject: [ConfigService],
    }),
    TelegramModule,
  ],
})
export class NotificationModule {}
