import { NestFactory } from '@nestjs/core';
import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
} from '@nestjs/graphql';
import { GraphQLSchema } from 'graphql';
import { HelloResolver } from './hello/hello.resolver';

export async function generateSchema(): Promise<GraphQLSchema> {
  const app = await NestFactory.create(GraphQLSchemaBuilderModule);
  await app.init();

  const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
  const schema = await gqlSchemaFactory.create([HelloResolver]);

  return schema;
}
