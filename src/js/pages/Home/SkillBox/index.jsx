import React from 'react';
import { SkillItem } from 'app/components';
import styles from './index.module.scss';

export default ({ className, list, trigger }) => (
  <div className={className}>
    <div className={styles.box}>
      {list.length > 0 &&
        list.map((i) => <SkillItem key={i.id} className={styles.item} trigger={trigger} {...i} />)}
    </div>
  </div>
);
