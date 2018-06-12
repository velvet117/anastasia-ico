jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
global.Promise = require.requireActual('promise');
global.addEventListener = (event, cb) => {
    cb()
}
