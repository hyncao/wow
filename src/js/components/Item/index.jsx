import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import CoolDown from './CoolDown';
import { gcd } from 'app/lib/constant';
import skillData from 'app/lib/skillData';
import styles from './index.module.scss';
import bg from 'assets/images/item.png';
import bgOn from 'assets/images/itemOn.png';
import empty from 'assets/sounds/empty.mp3';

@observer
@inject('volumeStore', 'gcdStore')
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
    setGcd();
    this.setState({ cd: colddown || gcd });
    const t = setInterval(() => {
      const { cd } = this.state;
      const newCd = cd - 100;
      if (newCd === 0) {
        clearInterval(t);
      }
      this.setState({ cd: newCd });
    }, 100);
  }

  dealDamage() {

  }

  cast() {
    const { cd } = this.state;
    if (cd === 0) {
      this.play();
      this.startCd();
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
    const skillImg = require(`assets/images/rogue/backStab.jpg`);
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
