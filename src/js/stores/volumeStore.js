import { observable, action } from "mobx";
import { getLS } from 'app/lib/utils';

export default class countStore {
  @observable volume = getLS('volume') || 80;

  @action.bound
  setVolume(volume){
    this.volume = volume;
  }
}
