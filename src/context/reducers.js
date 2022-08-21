function saveState(state) {
  localStorage.setItem("state", JSON.stringify(state));
}

function updateLang(state, payload) {
  const newState = { ...state , lang: payload }
  saveState(newState)
  return newState;
}

export default function AppReducer(state, { type, payload }) {
  switch (type) {
    case 'UPDATE_LANG':
      return updateLang(state, payload);
    default:
      throw new Error("TYPE NOT FOUND");
  }
};
