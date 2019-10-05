export const ADD_LOG = "@Log/ADD_LOG";

export const actionCreator = {
    addLog: (log) => ({
        type: ADD_LOG,
        payload: log
    })  
};