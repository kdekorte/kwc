import {observable, autorun, reaction, computed} from 'mobx';

// base class for MobX stores that provides common wrapper for remote calls
export default class Store {
  @observable error;
  @observable pendingTasks = 0;
  @observable busy = false;

  constructor() {
    reaction(
      () => [this.pendingTasks],
      () => this.busy = this.pendingTasks > 0
    )
  }

  performOperation(operation) {
    this.pendingTasks++;
    this.error = null;
    return operation()
    .then(result => {
      this.pendingTasks--;
      return result;
    })
    .catch(error => {
        this.pendingTasks--;
        this.error = error;
        throw error;
    })
  }
}