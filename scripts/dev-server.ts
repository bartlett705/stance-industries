#!/usr/bin/env ts-node
// Thanks Maurice de Beijer for the snippet

import * as path from "path";
import * as express from "express";
import * as serveStatic from "serve-static";
import * as bodyParser from "body-parser";

const PORT = process.env.PORT || 8081;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(serveStatic(path.join(__dirname, "../build")));

app.post("/post", function(req, res) {
  console.log("got a post:", req.body);
  res.send(
    `Thanks for your emission. Please save this page for your records: 
${JSON.stringify(req.body)}
<a href="/">Back to the site</a>
`
  );
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} 💯`);
});
