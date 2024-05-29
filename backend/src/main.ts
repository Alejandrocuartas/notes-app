require('dotenv').config();
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('Nest is running...');
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          property: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]],
        }));
        return new BadRequestException({ validation_errors: result });
      },
      stopAtFirstError: true,
    }),
  );

  let portStr = process.env.PORT;
  let port = Number(portStr);
  if (!portStr || isNaN(port)) {
    port = 3000;
  }
  await app.listen(Number(port));
}
bootstrap();
