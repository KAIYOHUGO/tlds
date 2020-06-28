// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();


exports.addMessage = functions.https.onCall((data, context) => {
    if (context.auth.uid==undefined) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
        'while authenticated.');
    }
    const time=Date.now();
    admin.database().ref('/messages').push({
        context:data.msg||"Blank",
        time:time,
        uid:context.auth.uid||"Not Authenticated",
        displayName:data.displayName||"Not Provided",
        picture:data.picture||"Blank"
    });
    admin.database().ref('/status').set({
        msg_time:time
    });
    return true;
});






exports.support = functions.https.onCall((data, context) => {
    const msg = data.context;
    const time = Date.now();
    //if (context.auth.uid==undefined) {
    //    throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
    //    'while authenticated.');
    //}
    admin.database().ref('/improve').push({
        context:msg,
        time:time,
        uid:context.auth.uid||"Not Authenticated",
        displayName:"Not Provided"
    });
    return true;
});

exports.addNote = functions.https.onCall((data, context) => {
    if (context.auth.uid==undefined) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
        'while authenticated.');
    }
    const time=Date.now();
    admin.database().ref('/note').push({
        text:data.text||"Blank",
        timeStamp:time,
        uid:context.auth.uid||"Not Authenticated",
        displayName:data.displayName||"Not Provided",
        picture:data.picture||"Not Provided",
        content:data.content||"Not Provided",
        image:data.image||"Not Provided",
        approved:"false",
        subject:data.subject||"Not Provided"
    });
    admin.database().ref('/status').set({
        msg_time:time
    });
    return true;
});

