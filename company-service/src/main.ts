import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { GlobalExceptionFilter } from './filter';
import { HttpException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter());
  

  app.useGlobalPipes(new ValidationPipe({
  whitelist: true,
  transform: true,
  exceptionFactory: (errors) => {
    const messages = errors.map(err => {
      const constraints = err.constraints ? Object.values(err.constraints).join(', ') : 'Validation error';
      return `${err.property} ${constraints}`;
    });
    return new HttpException({ message: messages, error: 'Bad Request' }, 400);
  }
}));


  const port = Number(process.env.APP_PORT) || 3300;

  const config = new DocumentBuilder()
    .setTitle('Company Service')
    .setDescription('Company Service API Documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3001,
    },
  });
  await app.startAllMicroservices();
  await app.listen(port, () => {
    console.log(`Company service is running http://localhost:${port}/api`);
  });
}
bootstrap();
