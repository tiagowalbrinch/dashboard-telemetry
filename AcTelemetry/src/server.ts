//import { ACRemoteTelemetryClient } from "ac-remote-telemetry-client";
import express from 'express';
const ACCNodeWrapper = require('../acc-node-wrapper');
const port = 7788;

const ACTelemetryServer = () => {
  const wrapper = new ACCNodeWrapper();
  wrapper.initSharedMemory(10, 1000, 10000, false);
  const app = express();

  app.get('/physics-info', (_, res) => {
    res.setHeader('Content-type', 'text/event-stream');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    wrapper.on('M_PHYSICS_RESULT', (result) => {
      const jsonString = JSON.stringify(result);
      const buffer = Buffer.from(jsonString, 'utf-8');
      res.write(`data: ${buffer}\n\n`);
    });
  });

  app.get('/graphics-info', (_, res) => {
    res.setHeader('Content-type', 'text/event-stream');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    wrapper.on('M_GRAPHICS_RESULT', (result) => {
      const jsonString = JSON.stringify(result);
      const buffer = Buffer.from(jsonString, 'utf-8');
      res.write(`data: ${buffer}\n\n`);
    });
  });

  app.get('/static-info', (_, res) => {
    res.setHeader('Content-type', 'text/event-stream');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    wrapper.on('M_STATIC_RESULT', (result) => {
      const jsonString = JSON.stringify(result);
      const buffer = Buffer.from(jsonString, 'utf-8');
      res.write(`data: ${buffer}\n\n`);
    });
  });

  app.listen(port, () => {
    console.log(`Server in listening on port: ${port}`);
  });
};

ACTelemetryServer();
