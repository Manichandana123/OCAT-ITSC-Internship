const { AssessmentService } = require(`../microservices`);
const { ResponseHandler } = require(`../utils`);

const { Router } = require(`express`);

const assessmentRouter = Router();
assessmentRouter.post(
  `/assessment/submit`,
  async (req, res, next) => {
    try {
      await AssessmentService.submit(req.body);
      ResponseHandler(
        res,
        `Submitted assessment`,
        {},
      );
    } catch (err) {
      next(err);
    }
  },
);

assessmentRouter.get(
  `/assessment/list`,
  async (req, res, next) => {
    try {
      // verify that your data is making it here to the API by using console.log();
      // call the AssessmentService.getList function from packages/api/src/microservices/Assessment-Service.js
      const assessments = await AssessmentService.getList();
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
assessmentRouter.post(
  `/assessment/:id`,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await AssessmentService.delete(id);
      ResponseHandler(
        res,
        `Deleted assessment`,
        {},
      );
    } catch (err) {
      next(err);
    }
  },
);

module.exports = { assessmentRouter };
