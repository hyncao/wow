export const weaponDamage = ({ weaponDPH, weaponType, ap }) => {
  let speed;
  switch(weaponType) {
    // 匕首
    case 'dagger':
      speed = 1.7;
      break;
    // 单手武器
    case 'oneHand':
      speed = 2.4;
      break;
    // 双手武器
    case 'twoHand':
      speed = 3.3;
      break;
    // 远程武器
    case 'range':
      speed = 2.8;
      break;
    default:
      speed = 1.7;
      break;
  }
  return weaponDPH + ap / 14 * speed;
}

export const multiplyAp = ({ ap }) => ap;

export default {
  weaponDamage,
  multiplyAp,
};
