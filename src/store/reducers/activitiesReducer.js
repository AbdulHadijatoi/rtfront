const initialState = {
    popularActivities: [],
    loading: false,
    error: null,
  };

  const activitiesReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GET_POPULAR_ACTIVITIES":
        return {
          ...state,
          popularActivities: action.payload,
          loading: false,
          error: null,
        };
      case "GET_POPULAR_ACTIVITIES_REQUEST":
        return {
          ...state,
          loading: true,
        };
      case "GET_POPULAR_ACTIVITIES_FAILURE":
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      default:
        return state;
    }
  };

  export default activitiesReducer;
