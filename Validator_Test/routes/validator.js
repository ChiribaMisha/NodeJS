const Ajv = require("ajv");
const ajv = new Ajv();

const validation = (req, res, next) => {

  const schema = {
    "type": "object",
    "properties": {
      "login": {
        "type": "string",
        "maxLength": 9,
        "minLength": 3,
        "pattern": "^[a-z0-9_-]{3,16}$"
      },
      "qty": {
        "type": "string",
        "minLength": 1,
        "maxLength": 3,
        "pattern": "[0-9]"
      },
      "email": {
        "type": "string",
        "maxLength": 50,
        "minLength": 10,
      }
    }
  }

  const validate = ajv.compile(schema);
  const valid = validate(req.body);
  if (!valid) {
    res.send(validate.errors[0].instancePath)
  } else {
    next();
  };
};

module.exports = {
  validation,
};

