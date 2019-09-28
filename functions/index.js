const functions = require('firebase-functions');
const admin = require('firebase-admin');
var bodyParser = require('body-parser');

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