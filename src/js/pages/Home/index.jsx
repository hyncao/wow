import React from 'react';
import { Item, Range } from 'app/components';
import styles from './index.module.scss';

function Home() {
  return (
    <div className={styles.content}>
      <Range />
      <Item id="backStab" />
    </div>
  );
}

export default Home;
