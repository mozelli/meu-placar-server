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
  AddNewUser(request, response) {
    const { name, lastname, email, password, birthday, permition } =
      request.body;
    const { day, month, year } = birthday;

    const birthdayTimestamp = new Date(`${year}-${month}-${day}`);

    return response.json({
      name,
      lastname,
      email,
      password,
      birthday: birthdayTimestamp,
      permition,
    });
  },
};
