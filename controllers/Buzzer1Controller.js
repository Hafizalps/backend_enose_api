const { Router } = require('express');
const m$todo = require('../modules/buzzer1.modules');
const response = require('../helpers/response');

const SensorController = Router();

SensorController.get('/', async (req, res, next) => {
  const add = await m$todo.listSensor();

  response.sendResponse(res, add);
});

module.exports = SensorController;
