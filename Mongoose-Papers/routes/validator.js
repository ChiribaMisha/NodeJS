const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });

const validation = (req, res, next) => {

  const schema = {
    "type": "object",
    "properties": {
      "email": {
        "type": "string",
        "maxLength": 50,
        "minLength": 10,
      },
      "password": {
        "type": "string",
        "maxLength": 22,
        "minLength": 6,
        "pattern": "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
      },
      "name": {
        "type": "string",
        "pattern": "^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$",
        "maxLength": 100,
        "minLength": 2
      }
    }
  }

  const validate = ajv.compile(schema);
  const valid = validate(req.body);
  if (!valid) {
    const arrError = validate.errors.map(el => {
      return el.dataPath;
    });

    const uniqArrError = Array.from(new Set(arrError));

    res.send(uniqArrError);
  } else {
    next();
  };
};

module.exports = {
  validation,
};