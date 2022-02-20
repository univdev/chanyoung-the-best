const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { NCPClient } = require('node-sens');

admin.initializeApp();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.smsNotification = functions.firestore.document('recommends/{recommendId}').onCreate((snapshot) => {
  const { id } = snapshot;
  const clientPayload = {
    accessKey: process.env.NAVER_CLOUD_API_KEY,
    serviceId: process.env.SMS_SERVICE_ID,
    secretKey: process.env.SMS_SECRET_KEY,
    phoneNumber: process.env.CALLING_NUMBER,
  };
  // const updateAPI = `${process.env.API_BASE_URI}/recommendationAccept`;
  // const updateQuery = `?recommendId=${id}`;
  const fs = admin.firestore();
  const doc = fs.collection('recommends').doc(id);
  doc.get().then((snapshot) => {
    // const data = snapshot.data();
    const messageContent = [
      '칭찬이 새롭게 등록 되었습니다!',
      // `작성자: ${data.author}`,
      // `작성 내용: ${data.content}`,
      // `수락 URI: ${[updateAPI, updateQuery].join('')}`,
    ];
    functions.logger.log('SMS Prepended: ', { message: messageContent});
    const ncp = new NCPClient(clientPayload);
    ncp.sendSMS({
      to: clientPayload.phoneNumber,
      content: messageContent.join('\n'),
    }).then((response) => {
      functions.logger.log('SMS Sended!', response);
    }).catch((error) => {
      functions.logger.error(error);
    });
  });
});

exports.recommendationAccept = functions.https.onRequest((req, res) => {
  const { recommendationId } = req.query;
  if (!recommendationId) throw new Error('상태를 수정할 수 있는 추천사가 없습니다.');
  const fs = admin.firestore();
  const recommends = fs.collection('recommends');
  const doc = recommends.doc(recommendationId);
  doc.get().then((snapshot) => {
    const docItem = snapshot.data();
    const updateContent = {
      updatedAt: new Date(),
      isVisible: true,
    };
    const payload = Object.assign(docItem, updateContent);
    doc.update(payload).then(() => {
      res.json({
        success: true,
        error: null,
        recommendation: docItem,
      });
    }).catch((error) => {
      res.json({ success: false, error });
    });
  }).catch((error) => {
    res.json({ success: false, error });
  });
});
