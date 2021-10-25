import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../repositories/UserRepository';
import { RequestBodyCreateUser } from '../interfaces';

class UserController {
  async create(request: Request, response: Response) {
    /*
       #swagger.tags = ['User']
       #swagger.description = 'Endpoint para criar um usuário.'
       #swagger.parameters['obj'] = {
          in: 'body',
          schema: {
              name: 'Jhon Doe',
              email: 'jhon@teste.com',
              password: 'jhonteste'
          }
    } */
    const userRepository = getCustomRepository(UserRepository);

    const { name, email, password }: RequestBodyCreateUser = request.body;

    const existUser = await userRepository.findOne({ email });

    if (existUser) {
      return response.status(400).json({ message: 'User already exists!' });
    }
    console.log(request.body);
    if (password.length <= 7) {
      return response
        .status(400)
        .json({ message: 'Password must be at least 8 digits long.' });
    }

    const user = userRepository.create({
      name,
      email,
      password,
    });

    await userRepository.save(user);
    const obj = { name: user.name, email: user.email };
    return response.status(201).json(obj);
  }
}

export default new UserController();
