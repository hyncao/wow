import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import CoolDown from './CoolDown';
import { gcd } from 'app/lib/constant';
import skillData from 'app/lib/skillData';
import { isCrit } from 'app/lib/utils';
import formula from 'app/lib/formula';
import styles from './index.module.scss';
import bg from 'assets/images/item.png';
import bgOn from 'assets/images/itemOn.png';
import empty from 'assets/sounds/empty.mp3';

@observer
@inject('volumeStore', 'gcdStore', 'characterStore', 'damageStore')
class Item extends Component {
  constructor(props) {
    super(props);
    const { colddown, gcdStore: { getGcd } } = props;
    this.state = {
      bgImg: bg,
      cd: colddown || getGcd,
      skillObj: {},
      loading: true,
    }
    this.play = this.play.bind(this);
    this.startCd = this.startCd.bind(this);
    this.costEnergy = this.costEnergy.bind(this);
    this.dealDamage = this.dealDamage.bind(this);
    this.cast = this.cast.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
  }

  componentDidMount() {
    const { id } = this.props;
    const skillObj = skillData.filter((i) => i.id === id)[0];
    this.setState({ skillObj, loading: false });
  }

  componentWillReceiveProps(prevProps, nextProps) {
    const { colddown } = this.nextProps;
    if (!colddown && nextProps.gcdStore.getGcd !== prevProps.gcdStore.getGcd) {
      this.setState({ cd: nextProps.gcdStore.getGcd });
    }
  }

  play() {
    const { id, volumeStore: { volume }, } = this.props;
    const audio = document.getElementById(id);
    const fixVolume = volume / 100;
    audio.volume = fixVolume;
    audio.load();
    audio.play();
  }

  startCd() {
    const { colddown, gcdStore: { setGcd } } = this.props;
    setGcd(colddown || gcd);
    this.setState({ cd: colddown || gcd });
    const t = setInterval(() => {
      const { cd } = this.state;
      const newCd = cd - 100;
      if (newCd === 0) {
        clearInterval(t);
      }
      setGcd(newCd);
      this.setState({ cd: newCd });
    }, 100);
  }

  costEnergy() {
    const { skillObj: { cost } } = this.state;
    const { characterStore: { setEnergy, recoverTimer, setRecoverTimer, character: { energy } } } = this.props;
    if (energy < cost) return false;
    // 扣除能量
    setEnergy(energy - cost);
    clearInterval(recoverTimer);
    const timer = setInterval(() => {
      const { characterStore: { character: { energy } } } = this.props;
      setEnergy(energy + 1);
    }, 100)
    setRecoverTimer(timer);
    return true
  }

  dealDamage() {
    const { skillObj: { id, skillType, name, comboReward, multiplyEffect, increase } } = this.state;
    const { characterStore: { ap, crit, character: { weaponDPH, weaponType, critDamage, comboPoint }, setCombo, }, damageStore: { setDamageData } } = this.props;

    let baseDamage = 1;
    if (skillType === 'combo') {
      const multiply = multiplyEffect.split('*');
      multiply.forEach((i) => {
        let multiplier;
        if (isNaN(parseFloat(i))) {
          multiplier = formula[i]({ weaponDPH: weaponDPH, weaponType: weaponType, ap });
        } else {
          multiplier = parseFloat(i);
        }
        baseDamage *= multiplier;
      })
      setCombo(comboReward);
    } else {
      const total = increase * comboPoint;
      baseDamage = total * formula[multiplyEffect]({ weaponDPH: weaponDPH, weaponType: weaponType, ap });
      setCombo(0);
    }
    // 计算暴击
    const critFlag = isCrit(crit);
    if (critFlag) {
      baseDamage *= critDamage;
    }
    // 对伤害进行四舍五入
    baseDamage = Math.round(baseDamage);
    console.log(baseDamage);
    const damageObj = {
      id, name, damage: baseDamage, critFlag,
    }
    setDamageData(damageObj);
  }

  cast() {
    const { cd } = this.state;
    if (cd === 0) {
      if (this.costEnergy()) {
        this.play();
        this.startCd();
        this.dealDamage();
      }
    }
  }

  handleTouchStart() {
    this.setState({ bgImg: bgOn })
  }

  handleTouchEnd() {
    this.cast();
    this.setState({ bgImg: bg })
  }

  render() {
    const { bgImg, cd, loading } = this.state;
    if (loading) return null;
    const { className, id } = this.props;
    const skillImg = require(`assets/images/rogue/${id}.jpg`);
    const sound = require(`assets/sounds/${id}.mp3`);
    const itemProp = {
      onTouchStart: this.handleTouchStart,
      onTouchEnd: this.handleTouchEnd,
    }
    return (
      <div className={className}>
        <div className={styles.item} {...itemProp}>
          <CoolDown cd={cd} />
          <img className={styles.bg} src={bgImg} alt="bg" />
          <img className={styles.skill} src={skillImg} alt="skill" />
        </div>
        <audio className={styles.audio} src={sound} id={id} />
        <iframe title="iframe" allow="autoplay" style={{ display: 'none' }} src={empty} />
      </div>
    );
  }
}

export default Item;
