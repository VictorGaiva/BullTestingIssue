import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { IssueConsumer } from './app.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'bullisue',
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    IssueConsumer
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
