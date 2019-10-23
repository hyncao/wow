import countStore from './countStore';
import historyStore from './historyStore';
import transitionStore from './transitionStore';
import volumeStore from './volumeStore';

export default {
  countStore: new countStore(),
  historyStore: new historyStore(),
  transitionStore: new transitionStore(),
  volumeStore: new volumeStore(),
}
