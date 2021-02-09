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
export async function getDocDatas(docPath) {
  const snap = await db.doc(docPath).get()
  return snap.data()
}
export async function getDoc(docPath) {
  const snap = await db.collection(docPath)

  return snap
}


// STRIPE_WEBHOOK_SECRET="whsec_cAXnAsfzFA3JR0PtcX0B4U8ff5zM0QYx"


//STRIPE_WEBHOOK_SECRET="whsec_MHGm0N6KW6rvOjq3VS5ZRI0R6hAHvwl9" CLI
