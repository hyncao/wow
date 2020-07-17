import React from 'react';
import styles from './index.module.scss';

export default ({ className, life, lifeMax }) => (
  <div className={className}>
    <div className={styles.box}>
      <div className={styles.bar}>
        <div
          className={styles.life}
          style={{ width: `${(life / lifeMax) * 100}%` }}
        />
      </div>
      <div className={styles.progress}>
        {life} / {lifeMax}
      </div>
    </div>
  </div>
);
