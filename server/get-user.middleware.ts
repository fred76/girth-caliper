import { authdd } from './authFirebase';
import { NextFunction, Request, Response } from 'express';


export function getUserMiddleware(req: Request, res: Response, next: NextFunction) {

  const jwt = req.headers.authorization;

  if (jwt) {
    authdd.verifyIdToken(jwt)
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

