import countStore from './countStore';
import historyStore from './historyStore';
import transitionStore from './transitionStore';

export default {
  countStore: new countStore(),
  historyStore: new historyStore(),
  transitionStore: new transitionStore(),
}
