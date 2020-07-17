import React, { useState, useCallback, useRef } from 'react';
import styles from './index.module.scss';

export default ({ className, icon, cd, trigger, id }) => {
  const [cdState, setCdState] = useState(false);
  const [cdNum, setCd] = useState(cd);
  const timer = useRef();

  const handleClick = useCallback(() => {
    if (!cdState) {
      setCdState(true);
      timer.current = setInterval(() => {
        setCd((cdNum) => {
          if (cdNum === 1) {
            clearInterval(timer.current);
            setCdState(false);
            return cd;
          }
          return cdNum - 1;
        });
      }, 1000);
      trigger(id);
    }
  }, [cd, cdState, id, trigger]);

  return (
    <div className={className} onClick={handleClick}>
      <div className={styles.box}>
        <img src={icon} alt="skill" />
        {cdState && <div className={styles.cd}>{cdNum}</div>}
      </div>
    </div>
  );
};
