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

const template = (data: object) => (
  `<html>
  <head>
    <style>
      body {
        font-family: sans-serif;
        background-color: #0f0f0f;
        color: cornflowerblue;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      code {
        background-color: 2a2a2a;
        border: 1px dotted black;
        border-radius: 0.25rem;
        padding: 0.5rem;
        max-width: 50%;
        margin-left: 1rem;
      }
      footer {
        position: relative;
        top: 5rem;
      }
    </style>
  </head>
  <body>
    <h4>Thanks for your emission. Please save this page for your records:</h4>
    <code
      >${JSON.stringify(data, null, 2)}
    </code>
    <footer>
      <a href="/">Back to the site</a>
    </footer>
    <!-- Oooh look at me not closing tags -->
  </body>
</html>
`)