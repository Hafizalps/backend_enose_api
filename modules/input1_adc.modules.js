// Helper database yang dibuat
const mysql = require('../helpers/database');
// Validation input
const Joi = require('joi');

class _blog {
  listSensor = async () => {
    try {
      const list = await mysql.query('SELECT * FROM hasil_adc', []);

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
        sensor1_adc: Joi.number().required(),
        sensor2_adc: Joi.number().required(),
        sensor3_adc: Joi.number().required(),
        sensor4_adc: Joi.number().required(),
        sensor5_adc: Joi.number().required(),
        sensor6_adc: Joi.number().required(),
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
        'INSERT INTO hasil_adc(sensor1_adc, sensor2_adc, sensor3_adc, sensor4_adc, sensor5_adc, sensor6_adc) VALUES (?,?,?,?,?,?)',

        [body.sensor1_adc, body.sensor2_adc, body.sensor3_adc, body.sensor4_adc, body.sensor5_adc, body.sensor6_adc]
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
