import {
  observable,
  action
} from 'mobx';

export default class transitionStore {
  @observable transitionFlag = false;

  @action.bound
  didLoad() {
    this.transitionFlag = true;
  }
}
