const initState = {};

const settingReducer = (state = initState, action) => {
    //console.log("Reducer", action);

    switch (action.type) {
        case 'CHANGE_MEMBER_ACCESS_GROUP_SUCCESS':
            console.log('Member Access Group Updated', action);
            return state;
        case 'CHANGE_MEMBER_ACCESS_GROUP_FAILED':
            console.log('Cannot Update Member Access Group Updated: ', action);
            return state;
        case 'LOAD_ACCESS_GROUP_SUCCESS':
            console.log('Access Group Loaded', action);
            return state;
        case 'LOAD_ACCESS_GROUP_FAILED':
            console.log('Failed To Load Access Group', action);
            return state;
        case 'CREATE_ACCESS_GROUP_SUCCESS':
            console.log('CREATE_ACCESS_GROUP_SUCCESS', action);
            return {
                ...state,
                CREATE_ACCESS_GROUP : action
            };
        case 'UPDATE_ACCESS_GROUP_SUCCESS':
            console.log('UPDATE_ACCESS_GROUP_SUCCESS', action);
            return {
                ...state,
                UPDATE_ACCESS_GROUP : action
            };
        default:
            return state;
    }
}

export default settingReducer;