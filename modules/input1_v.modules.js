// Helper database yang dibuat
const mysql = require('../helpers/database');
// Validation input
const Joi = require('joi');

class _blog {
  listSensor = async () => {
    try {
      const list = await mysql.query('SELECT * FROM hasil_volt', []);

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
        sensor1_volt: Joi.number().required(),
        sensor2_volt: Joi.number().required(),
        sensor3_volt: Joi.number().required(),
        sensor4_volt: Joi.number().required(),
        sensor5_volt: Joi.number().required(),
        sensor6_volt: Joi.number().required(),
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
        'INSERT INTO hasil_volt(sensor1_volt, sensor2_volt, sensor3_volt, sensor4_volt, sensor5_volt, sensor6_volt) VALUES (?,?,?,?,?,?)',

        [body.sensor1_volt, body.sensor2_volt, body.sensor3_volt, body.sensor4_volt, body.sensor5_volt, body.sensor6_volt]
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
