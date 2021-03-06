import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';

describe('AppModule', () => {
  let appController: AppController;
  let app: TestingModule;
  const mockFn = jest.fn(() => 'I was not supposed to run');

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [
        BullModule.registerQueue({
          prefix: `${process.pid}`,
          name: 'bullissue',
          redis: {
            host: 'localhost',
            port: 6379,
          },
          processors: [{ name: 'test', callback: mockFn }]
        }),
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
      await appController.getHello();
      return new Promise(resolve => {
        setTimeout(() => {
          expect(mockFn).toBeCalledTimes(1);
          resolve();
        }, 1000);
      });
    });
  });
});
