let instance: TimeWorkerManager | null = null;

export class TimeWorkerManager {
  private worker: Worker;

  private constructor() {
    this.worker = new Worker(new URL('./timeWorker.js', import.meta.url));
  }

  static getInstance() {
    if (!instance) {
      instance = new TimeWorkerManager();
    }
    return instance;
  }

  postMessage(message: any) {
    this.worker.postMessage(message);
  }

  onmessage(handler: (event: MessageEvent) => void) {
    this.worker.onmessage = handler;
  }

  terminate() {
    this.worker.terminate();
    instance = null;
  }
}
