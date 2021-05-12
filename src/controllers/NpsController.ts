import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import SurveyUserRepository from "../repositories/SurveyUserRepository";

export default class NpsController {
  async execute(req: Request, res: Response) {
    const { survey_id } = req.params;
    const surveysUserRepository = getCustomRepository(SurveyUserRepository);

    const surveysUsers = await surveysUserRepository.find({ survey_id });

    const detractors = surveysUsers.filter((survey) => survey.value < 7).length;
    const promoters = surveysUsers.filter((survey) => survey.value > 8).length;
    const passive = surveysUsers.filter(
      (survey) => survey.value > 6 && survey.value < 9
    ).length;

    const nps = (
      ((promoters - detractors) / surveysUsers.length) *
      100
    ).toFixed(2);

    const response = {
      detractors: detractors,
      promoters: promoters,
      passive: passive,
      nps: nps,
    };

    return res.json(response);
  }
}
