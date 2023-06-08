const Input1adcController = require('./controllers/Input1adcController');
const Input1vController = require('./controllers/Input1vController');
const Input1rsController = require('./controllers/Input1rsController');
const Input1rsfiltController = require('./controllers/Input1rsfiltController');
const Input1roController = require('./controllers/Input1roController');
const Input1ratioController = require('./controllers/Input1ratioController');
const Input1ppmController = require('./controllers/Input1ppmController');
const Input1muteController = require('./controllers/Input1muteController');
const Buzzer1Controller = require('./controllers/Buzzer1Controller');

// Define url API in Here
const _routes = [
  ['/alat-1-adc', Input1adcController], // untuk alat 1 adc (sementara dipakai untuk ambil dataset)
  ['/alat-1-v', Input1vController], // untuk alat 1 volt (sementara dipakai untuk ambil dataset)
  ['/alat-1-rs', Input1rsController], // untuk alat 1 resistansi (sementara dipakai untuk ambil dataset)
  ['/alat-1-rsfilt', Input1rsfiltController], // untuk alat 1 resistansi hasil filter LPF(sementara dipakai untuk ambil dataset)
  ['/alat-1-ro', Input1roController], // untuk alat 1 ro (sementara dipakai untuk ambil dataset)
  ['/alat-1-ratio', Input1ratioController], // untuk alat 1 ratio (sementara dipakai untuk ambil dataset)
  ['/alat-1-ppm', Input1ppmController], // untuk alat 1 ppm (sementara dipakai untuk ambil dataset)
  ['/alat-1-mute', Input1muteController], // untuk alat 1 status tombol mute buzzer

  ['/buzzer-1', Buzzer1Controller], // untuk alarm buzzer alat
];

// https://localhost:5001/tes

const routes = (app) => {
  _routes.forEach((route) => {
    const [url, controller] = route;
    app.use(`${url}`, controller);
  });
};

module.exports = routes;

// kalo class exports nya harus pake new
