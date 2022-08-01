module.exports = {
  requestLog(method, path) {
    console.log(
      `\n[${method} REQUEST] - ${process.env.BASE_URL}:${process.env.PORT}/${path}`
    );
    console.log(`[${new Date()}]\n`);
  },

  responseLog(status, code, message, where) {
    if (status === "error") {
      console.error(`[${code} RESPONSE] - ${message}`);
      console.error(`[${new Date()}] - ${where}\n`);
    }

    if (status === "success") {
      console.log(`[${code} RESPONSE] - ${message}`);
      console.error(`[${new Date()}] - ${where}\n`);
    }
  },

  errorLog(message, where) {
    console.error(`[ERROR] - ${message}`);
    console.error(`[${new Date()}] - ${where}\n`);
  },

  successLog(message) {
    console.error(`[SUCCESS] - ${message}`);
    console.error(`[${new Date()}] - ${where}\n`);
  },
};
