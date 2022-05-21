import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../errors/AppError';
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
  sub: string;
}
export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Bearer + {token} dentro do header
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('No token!', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      'ed2a113c46aee58dfb711003bc169e30',
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found!', 401);
    }

    req.user = {
      id: user_id,
    };
    console.log('cheguei até aqui');
    next();
  } catch {
    throw new AppError('Invalid token!', 401);
  }
}
