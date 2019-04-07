#!/usr/bin/env ts-node
// Thanks Maurice de Beijer for the snippet

const path = require("path");
const express = require("express");
const serveStatic = require("serve-static");

const PORT = process.env.PORT || 8081;
const app = express();

app.use(serveStatic(path.join(__dirname, "../build")));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} 💯`);
});