import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { TokenPayload } from '../interfaces';

function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void | Response<any, Record<string, any>> {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(401);
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = jwt.verify(token, '93eea6a2c12628b3a3b7618f6882c912');
    const { id } = data as TokenPayload;

    req.userId = id;
    return next();
  } catch {
    return res.sendStatus(401);
  }
}

export default authMiddleware;
