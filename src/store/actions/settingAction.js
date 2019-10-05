import { resolve } from "url";
import { reject } from "q";
import { isEmpty } from "react-redux-firebase";

export const updateMemberAccess = (record) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //Make async call to database
        const firestore = getFirestore();
        firestore.collection('users').doc(record.userId).update({
            /* role: firestore.doc(`/system_access_group/${record.role}`) */
            role: firestore.doc(`/system_access_group/${record.role}`)
        }).then(() => {
            dispatch({
                type: 'CHANGE_MEMBER_ACCESS_GROUP_SUCCESS',
                actionResult: true
            });
        }).catch((err) => {
            dispatch({
                type: 'CHANGE_MEMBER_ACCESS_GROUP_FAILED',
                actionResult: false,
                err
            })
        })
    }
}

export const loadAccessGroup = (record) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();

        //console.log("LOAD",record);

        let promises = [];

        for (var key in (record.template)) {
            var x = record.template;
            if ((record.template).hasOwnProperty(key)) {
                console.log(key, x[key]);
                var promis = firestore.collection('system_access_group').doc(record.roleName).collection('system_access_control').doc(key).get()
                    .then(result => {
                        var name
                        return  result.data();
                    });
                promises.push(promis);
            }
        }

        /* }); (var x = 0; x < 5; x++) {
            var promise = new Promise((resolve, reject) => {
                resolve("DONE!");
            });
            promises.push(promise);
        } */

        Promise.all(promises)
            .then(data => {
                console.log("First handler", data);
            });

        console.log(Promise.all(promises));

    }
}

export const createAccessGroup = (record) => {
    console.log(record);
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({
            type: 'CREATE_ACCESS_GROUP_SUCCESS',
            actionResult: record
        });
    }
}

export const updateAccessGroup = (record) => {
    console.log(record);
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({
            type: 'UPDATE_ACCESS_GROUP_SUCCESS',
            actionResult: record
        });
    }
}