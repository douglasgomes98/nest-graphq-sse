import {
  Args,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();
const topic = 'MESSAGE_NOTIFICATION';

@ObjectType()
export class MessagePayload {
  @Field(() => String)
  id: string;

  @Field(() => String)
  message: string;
}

@Resolver()
export class HelloResolver {
  @Query(() => String)
  async hello(): Promise<string> {
    return 'hello';
  }

  @Mutation(() => String)
  async sendMessage(@Args('message') message: string, @Args('id') id: string) {
    await pubsub.publish(topic, { id, message });
    return message;
  }

  @Subscription(() => MessagePayload, {
    // topics: topic,
    // filter: ({ payload, args }) => {
    //   return args.id === payload.id;
    // },
  })
  receiveMessage(@Args('id') _: string, @Root() root: MessagePayload) {
    console.log('root', root);
    return pubsub.asyncIterator(topic);
  }
}
