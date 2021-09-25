const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const gmailEmail = "ayereeten@gmail.com";
const gmailPassword = "@Jiggly87Bedroom!";
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword,
    },
});

// Sends an email confirmation when a user changes his mailing list subscription.
exports.sendEmailConfirmation = functions.firestore.document('/rsvps/{id}').onWrite(async(change) => {
    const val = snapshot.val();

    const mailOptions = {
        from: '"Chris and Jo wedding" <noreply@firebase.com>',
        to: "ayereeten@gmail.com",
    };

    // Building Email message.
    mailOptions.subject = 'Thanks!';
    mailOptions.text = 'We have received your RSVP!';

    try {
        await mailTransport.sendMail(mailOptions);
        console.log(`Sent`);
    } catch (error) {
        console.error('There was an error while sending the email:', error);
    }

    return null;
});