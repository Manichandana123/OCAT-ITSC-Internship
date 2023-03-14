const { AssessmentService } = require(`../microservices`);
const { ResponseHandler } = require(`../utils`);

const { Router } = require(`express`);

const assessmentRouter = Router();

console.log(`hi`);

assessmentRouter.post(
  `/assessment/submit`,
  async (req, res, next) => {
    try {
      console.log(`eneterd`);

      const { assessment } = req.body;

      console.log(req.body);

      // verify that your data is making it here to the API by using console.log(assessment);
      // call the AssessmentService.submit function from packages/api/src/microservices/Assessment-Service.js and
      // supply the correct parameters

      const returned = await AssessmentService.submit(req.body);
      console.log(`returned object`);
      console.log(returned);

      ResponseHandler(
        res,
        `Submitted assessment`,
        {},
      );
    } catch (err) {
      console.log(`error`);
      next(err);
    }
  },
);

assessmentRouter.get(
  `/assessment/list`,
  async (req, res, next) => {
    try {
      console.log(`entered get`);
      // verify that your data is making it here to the API by using console.log();
      // call the AssessmentService.getList function from packages/api/src/microservices/Assessment-Service.js
      const assessments = await AssessmentService.getList();
      console.log(assessments);

      ResponseHandler(
        res,
        `Fetched assessments`,
        { assessments },
      );
    } catch (err) {
      next(err);
    }
  },
);

module.exports = { assessmentRouter };
