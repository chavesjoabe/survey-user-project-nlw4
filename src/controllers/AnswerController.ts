import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import SurveyUserRepository from "../repositories/SurveyUserRepository";

//http://localhost:3333/answers/1?u=45324d3c-2af4-46e7-a9cc-2bfdca9081fe

export default class AnswerController {
  async execute(req: Request, res: Response) {
    const { value } = req.params;
    const { u } = req.query;

    const surveyUserRepository = getCustomRepository(SurveyUserRepository);

    const surveyUser = await surveyUserRepository.findOne({ id: String(u) });

    if (!surveyUser) {
      return res.status(404).json({ message: "survey not found" });
    }

    surveyUser.value = Number(value);

    await surveyUserRepository.save(surveyUser);

    return res.status(200).json(surveyUser);
  }
}
