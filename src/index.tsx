/** @jsx jsx */
import * as dotenv from 'dotenv'
dotenv.config()
import { jsx } from "@emotion/core";
import { renderToStaticMarkup } from "react-dom/server";
import { renderStylesToString } from "emotion-server";
import { mkdirSync, writeFileSync } from "fs";
import * as rimraf from "rimraf";
import * as path from "path";
import { Index, Services, Contact } from "./pages";
import { PageComponent } from './site';

const buildPath = path.join(__dirname, "../", "build");
console.log("Removing build directory: ", buildPath);
rimraf.sync(buildPath);
console.log("Creating new build directory.");
mkdirSync(buildPath);

type PageEntry = {
  component: PageComponent,
  path: string,
}

const manifest: PageEntry[] = [
  { component: Index, path: "index.html" },
  { component: Services, path: "services.html" },
  { component: Contact, path: "contact.html" }
];

for (const page of manifest) {
  console.log(`Rendering Markup for ${page.path}`);
  const markup = renderStylesToString(
    renderToStaticMarkup(<page.component currentPath={page.path} />)
  );

  console.log(`Writing Markup to ${path.join(buildPath, page.path)}`);
  writeFileSync(path.join(buildPath, page.path), markup);
}

console.log("Done!");
