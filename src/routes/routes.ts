import { Router } from "express";
import AnswerController from "../controllers/AnswerController";
import NpsController from "../controllers/NpsController";
import SendMailController from "../controllers/SendMailController";
import SurveyController from "../controllers/SurveyController";
import UserController from "../controllers/UserController";
const routes = Router();

const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController();
const answerController = new AnswerController();
const npsController = new NpsController();

//user routes
routes.get("/users", userController.findAll);

routes.get("/users/:id", userController.findById);

routes.post("/users", userController.create);

routes.put("/users/:id", userController.update);

routes.delete("/users/:id", userController.delete);

//surveys routes
routes.get("/surveys", surveyController.findAll);

routes.post("/surveys", surveyController.create);

//sendMail routes

routes.post("/sendmail", sendMailController.execute);

//answer routes

routes.get("/answers/:value", answerController.execute);

//NPS routes
routes.get("/nps/:survey_id", npsController.execute);

export default routes;
