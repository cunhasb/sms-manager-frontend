export default (state = [], action) => {
  // debugger;
  switch (action.type) {
    case "ADD_CARRIERS": {
      return action.carriers;
    }
    case "ADD_CARRIERS": {
      debugger;
      return [...state.carriers, action.carriers];
    }
    default:
      return state;
  }
};
