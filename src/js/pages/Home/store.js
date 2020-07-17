export const initState = {
  loading: true,
  skillList: [],
  life: 0,
  lifeMax: 0,
}

export const reducer = ( state, action) => {
  let tempState = { ...state };
  const { type, payload } = action;
  switch(type) {
    case 'setState': {
      tempState = {
        ...tempState,
        ...payload,
      };
      break;
    }
    default:;
  }
  return tempState;
}