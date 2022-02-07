import { SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { LS_ACCESS_TOKEN, LS_OTLP_URL, SERVICE_NAME, SERVICE_VERSION } from "../constants";

const OpenTelemetry = require("@opentelemetry/sdk-node");
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

export async function otelSetup() {
    console.log('\n=======================================');

    // Configure an exporter object
    // This will export our traces to Lightstep
    const lightstepExporter = new OTLPTraceExporter({
        url: LS_OTLP_URL,
        headers: {
            'Lightstep-Access-Token': LS_ACCESS_TOKEN
        }
    });

    console.log('Created Lightstep exporter...');

    // Configure our provider object
    // This will setup information in Lightstep like service name version
    const provider = new NodeTracerProvider({
        resource: new Resource({
          [SemanticResourceAttributes.SERVICE_NAME]: SERVICE_NAME,
          [SemanticResourceAttributes.SERVICE_VERSION]: SERVICE_VERSION,
        }),
      });
      provider.addSpanProcessor(new SimpleSpanProcessor(lightstepExporter));
      provider.register();


    // Create and instiate the Otel Node SDK
    // This will automatically instrument our code and export it to Lighstep using the above
    // provider and exporter
    const sdk = new OpenTelemetry.NodeSDK({
        traceExporter: lightstepExporter,
        instrumentations: [getNodeAutoInstrumentations()]
    });

    console.log('Created OpenTelemetry SDK with Lightstep Exporter...');

    sdk.start();

    console.log('Initialized Lightstep Otel Config');
    console.log('=======================================');
}