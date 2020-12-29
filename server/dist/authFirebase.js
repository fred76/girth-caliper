"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authdd = void 0;
const admin = require('firebase-admin');
const serviceAccountPath = `./service-accounts/${process.env.SERVICE_ACCOUNT_FILE_NAME}`;
admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath),
    databaseURL: process.env.FIRESTORE_DATABASE_URL
});
exports.authdd = admin.auth();
//# sourceMappingURL=authFirebase.js.map