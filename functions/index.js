const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { NCPClient } = require('node-sens');

admin.initializeApp();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.smsNotification = functions.firestore.document('recommends/{recommendId}').onCreate(() => {
  const clientPayload = {
    accessKey: process.env.NAVER_CLOUD_API_KEY,
    serviceId: process.env.SMS_SERVICE_ID,
    secretKey: process.env.SMS_SECRET_KEY,
    phoneNumber: process.env.CALLING_NUMBER,
  };
  const ncp = new NCPClient(clientPayload);
  ncp.sendSMS({
    to: clientPayload.phoneNumber,
    content: '칭찬이 새롭게 등록 되었습니다!',
  }).then((response) => {
    functions.logger.log('SMS Sended!', response);
  }).catch((error) => {
    functions.logger.error(error);
  });
});
