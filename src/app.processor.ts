import { Processor, Process, OnQueueActive } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('bullissue')
export class IssueConsumer {

  @Process('test')
  async transcode(job: Job<string>) {
    console.log(job.data);
    return job.data;
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }
}