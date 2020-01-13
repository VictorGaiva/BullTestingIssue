import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IssueConsumer } from './app.processor';
import { BullModule } from '@nestjs/bull';

describe('AppModule', () => {
  let appController: AppController;
  let app: TestingModule;

  beforeEach(async () => {
    app = await Test.createTestingModule({
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
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      expect(appController.getHello()).toBe('Hello World!');
      await new Promise(res => setTimeout(res, 1000))
    });
  });
});
