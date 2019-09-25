const functions = require('firebase-functions');
const admin = require('firebase-admin');
const FieldValue = admin.firestore.FieldValue;
var bodyParser = require('body-parser');
var jsonDiff = require('json-diff');

//access database
admin.initializeApp(functions.config().firebase);
var db = admin.firestore();

/* ------- Express Functions --------- */

const express = require('express');
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendStatus(200);
});

// Expose Express functions as a single Cloud Function (change exports.YOUR_FUNCTION_NAME)
exports.functions = functions.https.onRequest(app);
/* ------- Express Functions --------- */

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.signUp = functions.https.onRequest((request, response) => {
    const email = require('./email_templates/email_confirmation');
    response.send(email('Indunil', 'Girihagama', 'abc.com'));
});

// -------- Access Control Functions ------------
var user_roles = ["admin", "user"];
exports.newFeatures = functions.firestore.document('system_access_control/{section}').onWrite((change, context) => {
    var collection = "section";

    const newValue = change.after.data();
    const previousValue = change.before.data();

    const changes = jsonDiff.diff(previousValue, newValue, "-j");

    //console.log(changes);
    var changed = { added: [], deleted: [] };
    Object.keys(changes).forEach(function (key) {
        if (key.match(/__added/gm) && key.match(/__added/gm).length > 0)
            changed.added.push(key.split('__added')[0]);
        else if (key.match(/__deleted/gm) && key.match(/__deleted/gm).length > 0)
            changed.deleted.push(key.split('__deleted')[0]);
    });

    user_roles.map(val => {
        changed.added.map(field => {
            var addRef = db.collection('system_access_group').doc(val).collection('system_access_control').doc(collection);
            var adding = addRef.update({
                [field]: false
            });
        });

        changed.deleted.map(field => {
            var removeRef = db.collection('system_access_group').doc(val).collection('system_access_control').doc(collection);
            var removing = removeRef.update({
                [field]: FieldValue.delete()
            });
        });
    });

    return;
});
// -------- Access Control Functions ------------