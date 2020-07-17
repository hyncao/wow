import React from 'react';
import styles from './index.module.scss';

export default ({ className, damage, isCrit }) => (
  <div className={className}>
    <div className={`${styles.damage} ${isCrit ? styles.crit : ''}`}>
      {damage}
    </div>
  </div>
);
