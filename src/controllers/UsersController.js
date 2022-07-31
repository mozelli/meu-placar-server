const Users = require("../models/Users");
const bcrypt = require("bcryptjs");

module.exports = {
  /**
   * Login Function
   * @Params request, response
   * @Return User Object {id, name, lastname, birthday, email, token}
   */
  async SignIn(request, response) {
    const { email, password } = request.body;
    try {
      const user = await Users.findOne({ email }).select("+password");

      if (!user)
        return response.status(400).json({ message: "User not founded." });

      if (!(await bcrypt.compare(password, user.password)))
        return response
          .status(401)
          .json({ message: "Invalid email or password." });

      user.password = undefined;
      // user.emailValidationToken = undefined;

      return response.json(user);
    } catch (error) {
      return response.satus(500).json(error.message);
    }
  },

  /**
   * Login Function
   * @Params request.body {name, lastname, email, password, birthday: {day, month, year}, permition}
   * @Return boolean
   */
  async AddNewUser(request, response) {
    const { name, lastname, email, password, birthday, permition } =
      request.body;
    const { day, month, year } = birthday;

    try {
      if (await Users.findOne({ email }))
        return response.status(400).json({ message: "Email already exists." });

      const passwordEncripted = await bcrypt.hash(password, 10);
      const emailValidationToken = await bcrypt.hash(email, 10);
      const birthdayTimestamp = new Date(`${year}-${month}-${day}`);

      const user = await Users.create({
        name,
        lastname,
        email,
        password: passwordEncripted,
        birthday: birthdayTimestamp,
        permition,
        emailValidationToken,
      });

      user.password = undefined;
      user.emailValidationToken = undefined;

      return response.status(201).json(user);
    } catch (error) {
      console.log(error.message);
      return response.status(500).json(error.message);
    }
  },
};
