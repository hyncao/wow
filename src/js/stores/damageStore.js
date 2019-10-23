import { observable, action } from "mobx";

export default class gcdStore {
  @observable damageData = [];

  @action.bound
  setGcd(damageData){
    this.damageData = damageData;
  }
}
