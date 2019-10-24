import { observable, action } from "mobx";

export default class gcdStore {
  @observable damageData = [];

  @action.bound
  setDamageData(damageData){
    const data = [...this.damageData].map((i) => {
      if (i.id === damageData.id) {
        return damageData;
      }
      return i;
    });
    this.damageData = data;
  }
}
