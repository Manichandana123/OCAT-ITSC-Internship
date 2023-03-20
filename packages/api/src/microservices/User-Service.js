const { User } = require(`../database/models`);
const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);

exports.login = async (user) => {
  try {
    const submittedUser = user.user.username;
    const userObj = await User.findOne({ where: { username: submittedUser } });

    if (!userObj) {
      return { message: `Invalid username or password`, status: `INVALID_USER` };
    }

    const isValidPassword = await bcrypt.compare(user.user.password, userObj.password);

    if (!isValidPassword) {
      return { message: `Invalid username or password`, status: `INVALID_PASSWORD` };
    }

    const token = jwt.sign({ id: userObj }, `secretKey`);

    return { message: `Login successful`, status: `SUCCESS`, token };

  }
  catch (error) {
    console.error(`Error saving user:`, error);
    throw error;
  }
};
