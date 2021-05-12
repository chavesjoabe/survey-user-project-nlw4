import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import UserRepository from "../repositories/UserRepository";

export default class UserController {
  async create(req: Request, res: Response) {
    const { name, email } = req.body;
    const userRepository = getCustomRepository(UserRepository);

    const existingUser = await userRepository.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "this user already exists" });
    }

    const user = userRepository.create({
      name,
      email,
    });

    await userRepository.save(user);

    return res.json(user);
  }

  async findAll(req: Request, res: Response) {
    const userRepository = getCustomRepository(UserRepository);
    const users = await userRepository.find();

    return res.json(users);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne(id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.status(200).json(user);
  }

  async update(req: Request, res: Response) {
    const { name, email } = req.body;
    const { id } = req.params;
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne(id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    await userRepository.update({ id }, { name, email });

    return res.status(200).json({ message: `user ${name} updated ` });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    await userRepository.delete({ id });

    return res
      .status(200)
      .json({ message: `user ${user.name} has been deleted` });
  }
}
