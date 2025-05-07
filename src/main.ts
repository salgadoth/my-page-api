import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RabbitMQService } from './rabbit/rabbit.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const rabbitMQService = app.get<RabbitMQService>(RabbitMQService);
  await rabbitMQService.connect();
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('My Page API')
    .setDescription('API responsible for providing data to my-page frontend.')
    .setVersion('0.1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3010);
}
bootstrap();
