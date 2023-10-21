import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TrackerModule } from './tracker/tracker.module';
import { NotificationModule } from './notifications/notification.module';
import { TelegramModule } from './notifications/telegram/telegram.module';
import { AuthModule } from './auth/auth.module';
import { IsUniqueConstraint } from './validation/is-unique';
import { ExistConstraint } from './validation/exist';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    NotificationModule,

    UsersModule,
    TrackerModule,
    TelegramModule,
    AuthModule,
  ],
  controllers: [],
  providers: [IsUniqueConstraint, ExistConstraint],
})
export class AppModule {}
