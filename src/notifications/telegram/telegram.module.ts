import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramModule as TGModule } from 'nestjs-telegram/dist/telegram.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TGModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        botKey: configService.get('TG_API_KEY'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [TelegramService],
})
export class TelegramModule {}
