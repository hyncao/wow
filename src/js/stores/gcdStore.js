import { observable, action } from "mobx";
import { gcd } from 'app/lib/constant';

export default class gcdStore {
  @observable getGcd = 0;

  @action.bound
  setGcd(){
    this.getGcd = gcd;
  }
}
