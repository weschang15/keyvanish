const Cryptr = require("cryptr");

exports.encrypt = (content, password) => {
  return new Promise((resolve, reject) => {
    const token = password
      ? process.env.SECRET_TOKEN + password
      : process.env.SECRET_TOKEN;

    const cryptr = new Cryptr(token);
    return resolve(cryptr.encrypt(content));
  });
};

exports.decrypt = (content, password) => {
  return new Promise((resolve, reject) => {
    const token = password
      ? process.env.SECRET_TOKEN + password
      : process.env.SECRET_TOKEN;

    const cryptr = new Cryptr(token);
    return resolve(cryptr.decrypt(content));
  });
};
