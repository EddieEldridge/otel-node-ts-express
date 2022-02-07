const {
  lightstep,
  opentelemetry,
} = require('lightstep-opentelemetry-launcher-node');

const sdk = lightstep.configureOpenTelemetry({
  accessToken: process.env.LS_ACCESS_TOKEN,
  serviceName: 'otel-express-node',
});

sdk.start().then(() => {
  console.log('\n ========================');
  console.log('Initialized Lightstep Otel SDK');
  console.log(sdk);
  console.log('\n ========================');

  // Make sure to load any modules you use after otel is started so that it
  // has its module loading hooks in place. In general, this is the right place
  // to require your code.
  require('./index');
});