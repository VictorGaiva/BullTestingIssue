import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class AppService {
  constructor(
    @InjectQueue('bullisue') private readonly bullQueue: Queue
  ) { }
  async getHello() {
    await this.bullQueue.add('test', 'data');
    return 'Hello World!';
  }
}
