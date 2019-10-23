import React, { useState } from 'react';
import { inject } from 'mobx-react';
import { setLS } from 'app/lib/utils';
import styles from './index.module.scss';

function Range({ className, volumeStore }) {
  const { volume, setVolume } = volumeStore;
  const [val, setVal] = useState(volume);
  const handleChange = (e) => {
    const { value } = e.target;
    setVal(value);
    setVolume(value);
    setLS('volume', value);
  }
  return (
    <div className={className}>
      <div className={styles.box}>
        <span>音量调节</span>
        <input type="range" min="1" max="100" value={val} onChange={handleChange} />
      </div>
    </div>
  )
}

export default inject('volumeStore')(Range);
