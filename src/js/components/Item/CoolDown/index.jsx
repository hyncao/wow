import React from 'react';
import styles from './index.module.scss';

function CoolDown({ cd }){
  if (cd === 0) return null;
  const fixCd = (cd) => {
    return (cd / 1000).toFixed(1);
  }
  return (
    <div className={styles.box}>
      <div>{fixCd(cd)}</div>
    </div>
  )
}

export default CoolDown;
