const { Router } = require(`express`);
const { ResponseHandler } = require(`../utils`);
const { UserService } = require(`../microservices`);

const userRouter = Router();

// Place your routes in here

userRouter.post(
  `/user/login`, async (req, res, next) => {
    try {

      const returned = await UserService.login(req.body);

      ResponseHandler(
        res,
        returned.message,
        next,
        returned.token,
      );
    }

    catch (err) {
      next(err);
    }
  },
);

module.exports = { userRouter };
