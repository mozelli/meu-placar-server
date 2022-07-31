const Users = require("../models/Users");
const bcrypt = require("bcryptjs");

module.exports = {
  /**
   * Login Function
   * @Params request, response
   * @Return User Object {id, name, lastname, birthday, email, token}
   */
  Login(request, response) {
    const { email, password } = request.body;
    return response.json({
      email,
      password,
    });
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

      return response.status(201).json(user);
    } catch (error) {
      console.log(error.message);
      return response.status(500).json(error.message);
    }
  },
};
