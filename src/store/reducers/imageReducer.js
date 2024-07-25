const initialState = {
    homeImage: null,
    aboutImage: null,
    contactUs: null,
    findUs: null,
    guidelineImage: null,
    privacyPolicyImage: null,
    termsConditionImage: null,
};

const imageReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_IMAGE":
            if (action.meta) {
                switch (action.meta.imageType) {
                    case 'home':
                        return {
                            ...state,
                            homeImage: action.payload,
                        };
                    case 'about':
                        return {
                            ...state,
                            aboutImage: action.payload,
                        };
                    case 'contact':
                        return {
                            ...state,
                            contactUs: action.payload,
                        };
                    case 'find':
                        return {
                            ...state,
                            findUs: action.payload,
                        };
                    case 'guideline':
                        return {
                            ...state,
                            guidelineImage: action.payload,
                        };
                    case 'privacyPolicy':
                        return {
                            ...state,
                            privacyPolicyImage: action.payload,
                        };
                    case 'termsCondition':
                        return {
                            ...state,
                            termsConditionImage: action.payload,
                        };
                    default:
                        return state;
                }
            }
            return state;

        default:
            return state;
    }
};

export default imageReducer;
