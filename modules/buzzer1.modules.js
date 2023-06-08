// Helper database yang dibuat
const mysql = require('../helpers/database');
// Validation input
const Joi = require('joi');

class _blog {
  listSensor = async () => {
    try {
      const list = await mysql.query(
        // 'SELECT * FROM tangkap_sensor_industry_2',
        'select * from `hasil_klasifikasi` order by id desc limit 1',
        []
      );

      return {
        // status : true,
        data: list[0]['hasil'],
      };
    } catch (error) {
      console.error('list data sensor Error', error);

      return {
        status: false,
        error,
      };
    }
  };
}

module.exports = new _blog();
