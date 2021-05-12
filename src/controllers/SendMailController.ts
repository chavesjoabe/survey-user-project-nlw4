import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import SurveyRepository from "../repositories/SurveyRepository";
import SurveyUserRepository from "../repositories/SurveyUserRepository";
import UserRepository from "../repositories/UserRepository";
import SendMailService from "../services/SendMailService";
import { resolve } from "path";
require("dotenv").config();

export default class SendMailController {
  async execute(req: Request, res: Response) {
    const { email, survey_id } = req.body;

    const userRepository = getCustomRepository(UserRepository);
    const surveyRepository = getCustomRepository(SurveyRepository);
    const surveyUserRepository = getCustomRepository(SurveyUserRepository);

    const user = await userRepository.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user does not exists" });
    }

    const survey = await surveyRepository.findOne({
      id: survey_id,
    });
    if (!survey) {
      return res.status(400).json({ message: "survey does not exists" });
    }

    const npsPath = resolve(__dirname, "..", "views", "emails", "npsmail.hbs");

    const surveyUserAlreadyExists = await surveyUserRepository.findOne({
      where: [{ user_id: user.id }, { value: null }],
      relations: ["user", "survey"],
    });

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      id: "",
      link: process.env.MAIL_URL,
    };

    if (surveyUserAlreadyExists) {
      variables.id = surveyUserAlreadyExists.id;
      await SendMailService.execute(
        user.email,
        survey.title,
        variables,
        npsPath
      );
      return res.json(surveyUserAlreadyExists);
    }

    const surveyUser = await surveyUserRepository.create({
      user_id: user.id,
      survey_id,
    });

    await surveyUserRepository.save(surveyUser);

    variables.id = surveyUser.id;

    await SendMailService.execute(user.email, survey.title, variables, npsPath);

    return res.status(200).json(surveyUser);
  }
}
