import { observable, action } from "mobx";

export default class gcdStore {
  @observable getGcd = 0;

  @action.bound
  setGcd(gcd){
    this.getGcd = gcd;
  }
}
