export const loadAccessGroup = (record) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();

        firestore.collection('system_access_group').doc(record.roleName).get()
            .then((result) => {
                dispatch({
                    type: 'LOAD_ACCESS_GROUP_SUCCESS',
                    actionExecution: true,
                    actionResult: result.data().access
                });
            }).catch((err) => {
                dispatch({
                    type: 'LOAD_ACCESS_GROUP_FAILED',
                    actionExecution: false,
                    err
                })
            });
    }
}

export const createAccessGroup = (record) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //Make async call to database
        const firestore = getFirestore();
        firestore.collection('system_access_group').doc(record.name).get()
            .then(docSnapshot => {
                if (!docSnapshot.exists) {
                    firestore.collection('system_access_group').doc(record.name).set({
                        access: record.record
                    }, { merge: true }).then(() => {
                        dispatch({
                            type: 'CREATE_ACCESS_GROUP_SUCCESS',
                            action: true
                        });
                    }).catch((err) => {
                        dispatch({
                            type: 'CREATE_ACCESS_GROUP_FAILED',
                            action: false,
                            err
                        });
                    });
                } else {
                    dispatch({
                        type: 'CREATE_ACCESS_GROUP_FAILED',
                        action: false,
                        err: { Message: "Role already exist! Please use another name." }
                    });
                }
            });
    }
}

export const updateAccessGroup = (record) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //Make async call to database
        const firestore = getFirestore();
        firestore.collection('system_access_group').doc(record.name).get()
            .then(docSnapshot => {
                if (docSnapshot.exists) {
                    firestore.collection('system_access_group').doc(record.name).set({
                        access: record.record
                    }, { merge: true }).then(() => {
                        dispatch({
                            type: 'UPDATE_ACCESS_GROUP_SUCCESS',
                            action: true
                        });
                    }).catch((err) => {
                        dispatch({
                            type: 'UPDATE_ACCESS_GROUP_FAILED',
                            action: false,
                            err
                        });
                    });
                } else {
                    dispatch({
                        type: 'UPDATE_ACCESS_GROUP_FAILED',
                        action: false,
                        err: { message: "Role does not exist! Please select another role to edit." }
                    });
                }
            });
    }
}