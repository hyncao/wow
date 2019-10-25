import {
  observable,
  action,
  computed
} from "mobx";

export default class characterStore {
  @observable character = {
    str: 0,
    dex: 1500,
    ap: 300,
    crit: 400,
    critDamage: 1.5,
    energy: 100,
    weaponDPH: 480,
    weaponType: 'dagger',
    comboPoint: 0,
  };

  @observable recoverTimer;

  @computed get ap() {
    return this.character.ap + this.character.dex * 1 + this.character.str * 1;
  }

  @computed get crit() {
    return ((Math.floor(this.character.dex / 30) + this.character.crit) / 42.9 / 100).toFixed(4) - 0;
  }

  @action.bound
  setCombo(num) {
    let comboPoint = 0;
    if (num !== 0) {
      comboPoint = this.character.comboPoint + num;
    }
    comboPoint = comboPoint > 5 ? 5 : comboPoint;
    this.character.comboPoint = comboPoint;
  }

  @action.bound
  setEnergy(energy) {
    this.character.energy = energy;
  }

  @action.bound
  setRecoverTimer(t) {
    this.recoverTimer = t;
  }

  @action.bound
  setCharacter(obj) {
    this.character = {
      ...this.character,
      ...obj,
    };
  }
}