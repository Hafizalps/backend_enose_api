// Helper database yang dibuat
const mysql = require('../helpers/database');
// Validation input
const Joi = require('joi');

class _blog {
  listSensor = async () => {
    try {
      const list = await mysql.query('SELECT * FROM hasil_rs', []);

      return {
        status: true,
        data: list,
      };
    } catch (error) {
      console.error('list data sensor Error', error);

      return {
        status: false,
        error,
      };
    }
  };

  addSensor = async (body) => {
    try {
      const schema = Joi.object({
        sensor1_rs: Joi.number().required(),
        sensor2_rs: Joi.number().required(),
        sensor3_rs: Joi.number().required(),
        sensor4_rs: Joi.number().required(),
        sensor5_rs: Joi.number().required(),
        sensor6_rs: Joi.number().required(),
      });

      const validation = schema.validate(body);

      if (validation.error) {
        const errorDetails = validation.error.details.map((detail) => detail.message);

        return {
          status: false,
          code: 422,
          error: errorDetails.join(', '),
        };
      }

      const add = await mysql.query(
        'INSERT INTO hasil_rs(sensor1_rs, sensor2_rs, sensor3_rs, sensor4_rs, sensor5_rs, sensor6_rs) VALUES (?,?,?,?,?,?)',

        [body.sensor1_rs, body.sensor2_rs, body.sensor3_rs, body.sensor4_rs, body.sensor5_rs, body.sensor6_rs]
      );
      return {
        status: true,
        data: add,
      };
    } catch (error) {
      console.error('addnilai sensor module Error: ', error);

      return {
        status: false,
        error,
      };
    }
  };
}

module.exports = new _blog();
