import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { swaggerConfig } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);

  const config = swaggerConfig(configService);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(
    configService.get('app.swagger.prefix') ?? 'api',
    app,
    document,
  );

  await app.listen(configService.get('app.port') || 3000);
}
void bootstrap();
