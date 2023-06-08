// Helper database yang dibuat
const mysql = require('../helpers/database');
// Validation input
const Joi = require('joi');

class _blog {
  listSensor = async () => {
    try {
      const list = await mysql.query('SELECT * FROM hasil_ro', []);

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
        sensor1_ro: Joi.number().required(),
        sensor2_ro: Joi.number().required(),
        sensor3_ro: Joi.number().required(),
        sensor4_ro: Joi.number().required(),
        sensor5_ro: Joi.number().required(),
        sensor6_ro: Joi.number().required(),
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
        'INSERT INTO hasil_ro(sensor1_ro, sensor2_ro, sensor3_ro, sensor4_ro, sensor5_ro, sensor6_ro) VALUES (?,?,?,?,?,?)',

        [body.sensor1_ro, body.sensor2_ro, body.sensor3_ro, body.sensor4_ro, body.sensor5_ro, body.sensor6_ro]
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
