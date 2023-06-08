// Helper database yang dibuat
const mysql = require('../helpers/database');
// Validation input
const Joi = require('joi');

class _blog {
  listSensor = async () => {
    try {
      const list = await mysql.query('SELECT * FROM hasil_ratio', []);

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
        sensor1_ratio: Joi.number().required(),
        sensor2_ratio: Joi.number().required(),
        sensor3_ratio: Joi.number().required(),
        sensor4_ratio: Joi.number().required(),
        sensor5_ratio: Joi.number().required(),
        sensor6_ratio: Joi.number().required(),
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
        'INSERT INTO hasil_ratio(sensor1_ratio, sensor2_ratio, sensor3_ratio, sensor4_ratio, sensor5_ratio, sensor6_ratio) VALUES (?,?,?,?,?,?)',

        [body.sensor1_ratio, body.sensor2_ratio, body.sensor3_ratio, body.sensor4_ratio, body.sensor5_ratio, body.sensor6_ratio]
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
