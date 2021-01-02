"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserMiddleware = void 0;
const authFirebase_1 = require("./authFirebase");
function getUserMiddleware(req, res, next) {
    const jwt = req.headers.authorization;
    if (jwt) {
        authFirebase_1.authdd.verifyIdToken(jwt)
            .then(jwtPayload => {
            req["uid"] = jwtPayload.uid;
            next();
        })
            .catch(error => {
            const message = 'Error verifying Firebase Id token';
            console.log(message, error);
            res.status(403).json({ message });
        });
    }
    else {
        next();
    }
}
exports.getUserMiddleware = getUserMiddleware;
//# sourceMappingURL=get-user.middleware.js.map