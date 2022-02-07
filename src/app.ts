import { otelSetup } from "./otel/otelSetup";

async function init(){

  // Setup Otel Stuff
  await otelSetup();

  // Make sure to load any modules you use after otel is started so that it
  // has its module loading hooks in place. In general, this is the right place
  // to require your code.
  require('./index');
}

init();