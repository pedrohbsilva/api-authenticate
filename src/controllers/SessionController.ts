import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import UserRepository from '../repositories/UserRepository';

class SessionController {
  async create(request: Request, response: Response) {
    /*
       #swagger.tags = ['Session']
       #swagger.description = 'Endpoint para logar um usuário.'
       #swagger.parameters['obj'] = {
          in: 'body',
          schema: {
              email: 'jhon@teste.com',
              password: 'jhonteste'
          }
    } */
    const { email, password } = request.body;

    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({ email });

    if (!user) {
      return response
        .status(400)
        .json({ error: 'Incorrect password or email' });
    }

    const matchPassword = await compare(password, user.password);

    if (!matchPassword) {
      return response
        .status(400)
        .json({ error: 'Incorrect password or email' });
    }

    const token = sign({ email }, '93eea6a2c12628b3a3b7618f6882c912', {
      subject: user.id,
      expiresIn: '1d',
    });

    return response.json({
      token,
      user,
    });
  }
}

export default new SessionController();
