import { Queue } from 'bull';
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class AppService {
  constructor(
    @InjectQueue('bullissue') private readonly bullQueue: Queue
  ) { }
  async getHello() {
    await this.bullQueue.add('test', 'data');
    return 'Hello World!';
  }
}
