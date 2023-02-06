import { Module } from '@nestjs/common';
import { ProfileModule } from './profile.module';
import { UserModule } from './user.module';
import { GameModule } from './game.module';
import { ApiTestModule } from './apiTest.module';
import { AuthModule } from './auth.module';

@Module({
  imports: [ApiTestModule, UserModule, ProfileModule, GameModule, AuthModule],
})
export class AppModule {}
