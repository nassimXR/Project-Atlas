import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './bootstrap/swagger.bootstrap';
import { ConfigService } from '@nestjs/config';
import { logger } from './bootstrap/logger.bootstrap';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
    
  );
  const configService = app.get(ConfigService);

  setupSwagger(app, configService);


  await app.listen(process.env.PORT ?? 3000);
  
  logger.log('Project Atlas API started');
}
bootstrap();
