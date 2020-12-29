 const Firestore = require('@google-cloud/firestore')

const serviceAccountPath = `./service-accounts/${process.env.SERVICE_ACCOUNT_FILE_NAME}`

export const db = new Firestore({
  projectId: process.env.PROJECT_ID,
  keyFilename: serviceAccountPath
})

export async function getDocData(docPath) {
  const snap = await db.doc(docPath).get()
  return snap.data()
}

/*

 //rules_version = '2';
  //service cloud.firestore {
  // match /databases/{database}/documents {
    // Matches any document in the cities collection as well as any document
    // in a subcollection.
  //   match /users/{document=**} {
   //    allow read, write, create: if request.auth != null;
   //  }
  // }
 // }

*/
