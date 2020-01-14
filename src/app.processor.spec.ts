import { Queue } from 'bull';
import { Test, TestingModule } from '@nestjs/testing';
import { BullModule, getQueueToken } from '@nestjs/bull';
import { AppService } from './app.service';
import { IssueConsumer } from './app.processor';

describe('AppProcessor', () => {
  let app: TestingModule;

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
        }),
      ],
      providers: [AppService, IssueConsumer],
    }).compile();

  });

  afterAll(async () => {
    await app.close();
  });

  it('should returna data', async () => {
    const queue: Queue = app.get<Queue>(getQueueToken('bullissue'));
    return new Promise(res => queue.add('test', 'data').then(job => job.finished().then(result => {
      expect(result).toBe(job.data);
      res();
    })));
  });
});
