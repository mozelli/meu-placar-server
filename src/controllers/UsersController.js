const Users = require("../models/Users");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const auth = require("../modules/auth");
const mailer = require("../modules/mailer");

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
      // const userId = user.id;

      const token = auth.generateJWT(user.id);

      return response.json({ user, token });
    } catch (error) {
      return response.status(500).json(error.message);
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
      // const emailValidationToken = await bcrypt.hash(email, 10);
      const emailValidationToken = crypto.randomBytes(20).toString("hex");
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

      const text = `Olá ${name} ${lastname}! Estamos felizes por você querer fazer parte do Meu Placar. Para concluir seu cadastro, copie e cole o seguinte link no seu navegador: http://localhost:4000/users/email-validation/${emailValidationToken}`;

      const html = `<h4>Conformação</h4><p><a href='http://localhost:4000/users/email-validation/${emailValidationToken}'>Clique aqui!</a>`;

      await mailer.send(
        "Meu Placar <no-reply@meuplacar.com",
        email,
        "Confirmação de email",
        text,
        html
      );

      user.password = undefined;
      user.emailValidationToken = undefined;

      return response.status(201).json(user);
    } catch (error) {
      console.log(error.message);
      return response.status(500).json(error.message);
    }
  },

  async EmailValidation(request, response) {
    const emailValidationToken = request.params.token;

    try {
      const user = await Users.findOne({ emailValidationToken });
      if (!user)
        return response
          .status(400)
          .json({ message: "Invalid token or expired." });

      await Users.findByIdAndUpdate(user.id, {
        $set: {
          state: "email validated.",
        },
      });

      return response.json({ message: "Email successfully validated!" });
    } catch (error) {
      return response.status(500).json(error.message);
    }
  },
};
