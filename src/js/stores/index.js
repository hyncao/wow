import historyStore from './historyStore';
import transitionStore from './transitionStore';
import volumeStore from './volumeStore';
import gcdStore from './gcdStore';
import damageStore from './damageStore';
import characterStore from './characterStore';

export default {
  historyStore: new historyStore(),
  transitionStore: new transitionStore(),
  volumeStore: new volumeStore(),
  gcdStore: new gcdStore(),
  damageStore: new damageStore(),
  characterStore: new characterStore(),
}
