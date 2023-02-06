import { Module } from '@nestjs/common';
import { ApiTestController } from '../controllers/apiTest.controller';

@Module({
  controllers: [ApiTestController],
})
export class ApiTestModule {}
