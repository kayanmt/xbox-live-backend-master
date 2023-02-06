import { NestFactory } from '@nestjs/core';
import { AppModule } from './main/nest-adapter/modules/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EnvVarsAdapter } from './utils/adapters/env-vars-adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('xbox-live-backend')
    .setVersion('1.0.0')
    .addTag('api-test')
    .addTag('user')
    .addTag('auth')
    .addTag('profile')
    .addTag('game')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(new EnvVarsAdapter().port || 3000);
}
bootstrap();
