import type { TaskStateModel } from "../models/TaskStateModel";

let instance: TimerWorkManager | null = null

export class TimerWorkManager{
  private worker: Worker;

  private constructor(){
    this.worker = new Worker(new URL('./timerWorker.js', import.meta.url))
  }

  static getInstance(){
    if(!instance){
      instance = new TimerWorkManager()
    }

    return instance
  }

  postMessage(message: TaskStateModel){
    this.worker.postMessage(message)
  }


  onmessage(cb: (e: MessageEvent) => void){
    this.worker.onmessage = cb
  }

  terminate(){
    this.worker.terminate()
    instance = null
  }
}