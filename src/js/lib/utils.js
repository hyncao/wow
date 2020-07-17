import React from 'react';
import ReactDOM from 'react-dom';
import { Damage } from 'app/components';

// 延迟
export const delay = (t) => new Promise((res) => setTimeout(res, t));

// 取url中参数
export const getUrlQuery = (name) => {
  if ((typeof name).toLowerCase() !== 'string') {
    console.error('name参数应该为string');
  }
  const search = window.location.search.substr(1);
  const query = search.split('&');
  let result;
  for (let i = 0; i < query.length; i += 1) {
    if (query[i].indexOf(`${name}=`) > -1) {
      const arr = query[i].split(`${name}=`);
      [, result] = arr;
      break;
    }
  }
  if (result) return result;
  console.log(`${name} 参数不存在`);
  return '';
};

export const getLS = (key) => {
  const ls = window.localStorage;
  if (ls.getItem(key)) {
    return ls.getItem(key);
  }
  return '';
};

export const setLS = (key, value) => {
  const ls = window.localStorage;
  ls.setItem(key, value);
};

export const removeLS = (key) => {
  const ls = window.localStorage;
  ls.removeItem(key);
};

export const injectHistory = (props) => {
  const {
    history,
    historyStore: { setHistory },
  } = props;
  setHistory(history);
};

export const dateFormat = (date) => {
  if (!date) {
    return null;
  }
  const t = new Date(date);

  function addZero(t) {
    let num = t;
    if (num.toString().length === 1) {
      num = `0${t}`;
    }
    return num;
  }
  const str = `${t.getFullYear()}-${addZero(t.getMonth() + 1)}-${addZero(
    t.getDate()
  )}`;
  return str;
};

export const timeFormat = (date) => {
  if (!date) {
    return null;
  }
  const t = new Date(date);

  function addZero(t) {
    let num = t;
    if (num.toString().length === 1) {
      num = `0${t}`;
    }
    return num;
  }
  const str = `${t.getFullYear()}-${addZero(t.getMonth() + 1)}-${addZero(
    t.getDate()
  )} ${addZero(t.getHours())}:${addZero(t.getMinutes())}`;
  return str;
};

export const showComponent = ({ transitionStore: { didLoad } }) => didLoad();

// 暴击算法
export const isCrit = (crit) => Math.random() < crit;

// 区间随机算法
export const randomRange = (arr) => {
  const [min, max] = arr;
  const delta = max - min;
  return parseInt(min + delta * Math.random());
};

export const showDamageComponent = (className, damage, isCrit) => {
  const root = document.createElement('div');
  document.body.appendChild(root);
  ReactDOM.render(
    <Damage className={className} damage={damage} isCrit={isCrit} />,
    root
  );
  // setTimeout(() => ReactDOM.unmountComponentAtNode(root), 2000);
};
