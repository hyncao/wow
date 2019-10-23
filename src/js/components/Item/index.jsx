import React, { useState } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.module.scss';
import bg from 'assets/images/item.png';
import bgOn from 'assets/images/itemOn.png';
import skill from 'assets/images/rogue/backstab.jpg';
import sound from 'assets/sounds/backStab.mp3';
import empty from 'assets/sounds/empty.mp3';

function Item({ className, volumeStore: { volume } }) {
  const fixVolume = volume / 100;
  const [bgImg, setBgImg] = useState(bg);
  const cast = () => {
    const bs = document.getElementById('bs');
    bs.volume = fixVolume;
    bs.load();
    bs.play();
  }
  const handleTouchStart = () => {
    setBgImg(bgOn);
  }
  const handleTouchEnd = () => {
    cast();
    setBgImg(bg);
  }
  const itemProp = {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
  }
  return (
    <div className={className}>
      <div className={styles.item} {...itemProp}>
        <img className={styles.bg} src={bgImg} alt="bg" />
        <img className={styles.skill} src={skill} alt="skill" />
      </div>
      <audio className={styles.audio} src={sound} id="bs" />
      <iframe title="iframe" allow="autoplay" style={{ display: 'none' }} src={empty} />
    </div>
  );
}

export default observer(inject('volumeStore')(Item));
