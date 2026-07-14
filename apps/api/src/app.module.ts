import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import swaggerConfig from './config/swagger.config';
import { LoggerModule } from 'nestjs-pino';
import { HealthModule } from './modules/health/health.module';

ConfigModule.forRoot({
  isGlobal: true,
});

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [swaggerConfig],
      }),
      
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'debug',},
      }),
      
    HealthModule,
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
