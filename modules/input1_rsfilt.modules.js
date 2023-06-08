// Helper database yang dibuat
const mysql = require('../helpers/database');
// Validation input
const Joi = require('joi');

class _blog {
  listSensor = async () => {
    try {
      const list = await mysql.query('SELECT * FROM hasil_rsfilt', []);

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
        sensor1_rsfilt: Joi.number().required(),
        sensor2_rsfilt: Joi.number().required(),
        sensor3_rsfilt: Joi.number().required(),
        sensor4_rsfilt: Joi.number().required(),
        sensor5_rsfilt: Joi.number().required(),
        sensor6_rsfilt: Joi.number().required(),
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
        'INSERT INTO hasil_rsfilt(sensor1_rsfilt, sensor2_rsfilt, sensor3_rsfilt, sensor4_rsfilt, sensor5_rsfilt, sensor6_rsfilt) VALUES (?,?,?,?,?,?)',

        [body.sensor1_rsfilt, body.sensor2_rsfilt, body.sensor3_rsfilt, body.sensor4_rsfilt, body.sensor5_rsfilt, body.sensor6_rsfilt]
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
