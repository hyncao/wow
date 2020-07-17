import React, { useReducer, useEffect, useCallback } from 'react';
import { initState, reducer } from './store';
import Boss from './Boss';
import LifeBar from './LifeBar';
import SkillBox from './SkillBox';
import { delay, showDamageComponent, isCrit } from 'app/lib/utils';
import loadingPic from 'assets/images/loading.png';
import skill1 from 'assets/images/skills/1.png';
import skill2 from 'assets/images/skills/2.png';
import skill3 from 'assets/images/skills/3.png';
import skill4 from 'assets/images/skills/4.png';
import skill5 from 'assets/images/skills/5.png';
import styles from './index.module.scss';

export default () => {
  const [state, dispatch] = useReducer(reducer, initState);
  const setState = useCallback(
    (state) => dispatch({ type: 'setState', payload: state }),
    []
  );

  const showDamage = useCallback(
    (damage, isCrit) => showDamageComponent(styles.damage, damage, isCrit),
    []
  );

  const triggerSkill = (id) => {
    const damage = id * 100;
    let life = state.life - damage;
    if (life < 0) {
      life = 0;
      alert('你赢了老弟');
    }
    showDamage(damage, isCrit(0.5));
    setState({ life });
  };

  // didmounted
  useEffect(() => {
    const didMounted = async () => {
      await delay(2000);
      setState({
        loading: false,
        skillList: [
          { icon: skill1, cd: 10, id: '1' },
          { icon: skill2, cd: 12, id: '2' },
          { icon: skill3, cd: 5, id: '3' },
          { icon: skill4, cd: 3, id: '4' },
          { icon: skill5, cd: 2, id: '5' },
        ],
        life: 10000,
        lifeMax: 10000,
      });
    };
    didMounted();
  }, [setState]);

  if (state.loading) {
    return (
      <div className={styles.loading}>
        <img src={loadingPic} alt="loading" />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <LifeBar
        className={styles.life}
        life={state.life}
        lifeMax={state.lifeMax}
      />
      <Boss className={styles.boss} />
      <SkillBox
        className={styles.skill}
        list={state.skillList}
        trigger={triggerSkill}
      />
    </div>
  );
};
