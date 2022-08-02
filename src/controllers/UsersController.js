const Users = require("../models/Users");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const auth = require("../modules/auth");
const mailer = require("../modules/mailer");
const { emailValidationView } = require("../modules/emailViewsGenerator");
const { responseLog } = require("../utils/logRegister");

module.exports = {
  async SignIn(request, response) {
    const { email, password } = request.body;
    try {
      const user = await Users.findOne({ email }).select("+password");

      if (!user) {
        responseLog(
          "error",
          400,
          "User not founded by email.",
          "UserController.js, SignIn(), Users.findOne()"
        );
        return response.status(400).json({ message: "User not founded." });
      }

      if (!(await bcrypt.compare(password, user.password))) {
        responseLog(
          "error",
          400,
          "Password doesn't match.",
          "UserController.js, SignIn(), bcrypt.compare()"
        );
        return response
          .status(401)
          .json({ message: "Invalid email or password." });
      }

      user.password = undefined;
      // const userId = user.id;

      const token = auth.generateJWT(user.id);

      responseLog(
        "success",
        201,
        "User logged.",
        "UserController.js, SignIn()"
      );
      return response.json({ user, token });
    } catch (error) {
      responseLog("error", 500, error.message, "UserController.js, SignIn()");
      return response.status(500).json(error.message);
    }
  },

  async AddNewUser(request, response) {
    const { name, lastname, email, password, birthday, permition } =
      request.body;
    const { day, month, year } = birthday;

    try {
      if (await Users.findOne({ email })) {
        responseLog(
          "error",
          400,
          "Email already exists.",
          "UserController.js, AddNewUser(), Users.findOne()"
        );
        return response.status(400).json({ message: "Email already exists." });
      }

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

      const url = `http://localhost:4000/users/email-validation/${emailValidationToken}`;
      const html = emailValidationView(name, url);

      await mailer.send(
        "Meu Placar <no-reply@meuplacar.com",
        email,
        "Confirmação de email",
        text,
        html
      );

      user.password = undefined;
      user.emailValidationToken = undefined;

      responseLog(
        "success",
        201,
        "New user created.",
        "UserController.js, AddNewUser()"
      );

      return response.status(201).json(user);
    } catch (error) {
      responseLog(
        "error",
        500,
        error.message,
        "UserController.js, AddNewUser()"
      );
      return response.status(500).json(error.message);
    }
  },

  async EmailValidation(request, response) {
    const emailValidationToken = request.params.token;

    try {
      const user = await Users.findOne({ emailValidationToken });
      if (!user) {
        responseLog(
          "error",
          400,
          "Email validation token doesn't match.",
          "UserController.js, EmailValidation(), Users.findOne()"
        );
        return response
          .status(400)
          .json({ message: "Invalid token or expired." });
      }

      await Users.findByIdAndUpdate(user.id, {
        $set: {
          state: "email_validated.",
        },
      });

      responseLog(
        "success",
        200,
        "Email successfully verified.",
        "UserController.js, EmailValidation()"
      );

      return response.json({ message: "Email successfully verified!" });
    } catch (error) {
      responseLog(
        "error",
        500,
        error.message,
        "UserController.js, EmailValidation()"
      );
      return response.status(500).json(error.message);
    }
  },

  async getUsers(request, response) {
    try {
      const users = await Users.find();
      responseLog("success", 200, "Users founded.");
      return response.json(users);
    } catch (error) {
      responseLog(
        "error",
        500,
        error.message,
        "UserController.js, getUsers(), Users.find()"
      );
      return response.status(500).json(error.message);
    }
  },

  async getUserById(request, response) {
    const id = request.params.id;

    try {
      const user = await Users.findOne({ id });

      responseLog("success", 200, "Users founded.");
      return response.json(user);
    } catch (error) {
      responseLog(
        "error",
        400,
        error.message,
        "UserController.js, getUsersById(), Users.findOne()"
      );
      return response.status(500).json(error.message);
    }
  },
};
