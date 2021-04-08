const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });

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
    if (validate.errors.length > 1) {
      console.log('++++++');
      const arrError = validate.errors.reduce((result, item) => {
        result.push(item.instancePath);
        return Array.from(new Set(result));
      }, []);
      res.send(arrError);
    } else {
      res.send(validate.errors[0].instancePath);
    };
  } else {
    next();
  };
};

module.exports = {
  validation,
};

