import { observable, action } from "mobx";

export default class countStore {
  @observable count = 0;
  @observable showBox = false;

  @action.bound
  add(){
    this.count += 1;
  }

  @action.bound
  showBoxModal(){
    this.showBox=true;
  }
}
