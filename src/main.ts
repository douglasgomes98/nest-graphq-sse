import { NestFactory } from '@nestjs/core';
import { createHandler } from 'graphql-sse/lib/use/express';
import { AppModule } from './app.module';
import { generateSchema } from './create-schema.resolver';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const schema = await generateSchema();
  const sseGraphqlHandler = createHandler({
    schema,
  });
  app.getHttpAdapter().use('/graphql/stream', sseGraphqlHandler);
  // app.use('/graphql/stream', sseGraphqlHandler);

  await app.listen(3000);
}
bootstrap();
