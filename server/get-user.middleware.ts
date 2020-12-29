import { authdd } from './authFirebase';
import { NextFunction, Request, Response } from 'express';


export function getUserMiddleware(req: Request, res: Response, next: NextFunction) {

  const jwt = req.headers.authorization

  if (jwt) {

    console.log( "OOOOO   " + jwt) ;


    authdd.verifyIdToken(jwt)
      .then(jwtPayload => {
        console.log( "jwtPayload.uid bbbb    " + jwtPayload.uid) ;
        req["uid"] = jwtPayload.uid
        next();
      })
      .catch(error => {
        const message = 'Error verifyng Firebase ID token'
        console.log(message, error);
        res.status(403).json({ message })
      })
  } else {
    console.log("PIPPOOO");

    next()
  }

}

