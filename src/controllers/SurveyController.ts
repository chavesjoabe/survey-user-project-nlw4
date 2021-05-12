import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import SurveyRepository from "../repositories/SurveyRepository";

export default class SurveyController {
  async findAll(req: Request, res: Response) {
    const surveyRepository = getCustomRepository(SurveyRepository);
    const all = await surveyRepository.find();

    return res.status(200).json(all);
  }
  async create(req: Request, res: Response) {
    const { title, description } = req.body;
    const surveyRepository = getCustomRepository(SurveyRepository);
    const survey = await surveyRepository.create({ title, description });
    await surveyRepository.save(survey);

    return res.status(200).json(survey);
  }
}
