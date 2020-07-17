import React from 'react';
import panda from 'assets/images/boss/panda.png';
import styles from './index.module.scss';

export default ({ className }) => (
  <div className={className}>
    <img src={panda} alt="boss" />
  </div>
);
