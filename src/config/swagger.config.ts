import { ConfigService } from '@nestjs/config';
import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = (configService: ConfigService) => {
  return new DocumentBuilder()
    .setTitle(configService.get('app.swagger.title') || 'Default API Title')
    .setDescription(
      configService.get('app.swagger.description') ||
        'Default description for the API',
    )
    .setVersion(configService.get('app.swagger.version') || '1.0')
    .addTag(configService.get('app.swagger.tag') || 'default-tag')
    .build();
};
