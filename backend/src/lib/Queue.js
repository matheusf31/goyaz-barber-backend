import Bee from 'bee-queue';
import CancellationMail from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';

/** fila de CancellationMail */
const jobs = [CancellationMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  /** armazenamos nossos jobs em queues */
  /** aqui dentro armazenamos a fila que possue conexão com o redis */
  /** armazenamos o handle também que vai processar o nosso job, disparando a tarefa */
  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  /** adicionar novos jobs na fila */
  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  /** processar as filas */
  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }
}

export default new Queue();
