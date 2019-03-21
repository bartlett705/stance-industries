/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { renderStylesToString } from "emotion-server";
import { mkdirSync, writeFileSync } from "fs";
import * as rimraf from "rimraf";
import * as path from "path";

type PageComponent = React.FunctionComponent<{ currentPath: string }>;

const NavLink: React.SFC<{ href: string; currentPath: string }> = ({
  href,
  currentPath,
  children
}) => (
  <a
    css={css`
      color: inherit;
      padding: 0.5rem;
      background-color: ${href.endsWith(currentPath) ? "#0f0f0f" : "inherit"};
      text-decoration: ${href.endsWith(currentPath) ? "none" : "underline"};
      border-radius: 0.2rem;
    `}
    href={href}
  >
    {children}
  </a>
);

const Nav: React.SFC<{ currentPath: string }> = ({ currentPath }) => (
  <div
    css={css`
      display: flex;
      justify-content: center;
      width: 100%;
      background-color: #2f2f2f;
    `}
  >
    <nav
      css={css`
        display: flex;
        justify-content: space-between;
        width: 15rem;
        padding: 0.5rem;
      `}
    >
      <NavLink currentPath={currentPath} href="./">
        Home
      </NavLink>
      <NavLink currentPath={currentPath} href="./services.html">
        Services
      </NavLink>
      <NavLink currentPath={currentPath} href="./contact.html">
        Contact
      </NavLink>
    </nav>
  </div>
);

const Page: React.SFC<{ title?: string; currentPath: string }> = ({
  title,
  currentPath,
  children
}) => (
  <html>
    <head>
      <title>Stance Industries{title && `| ${title}`}</title>
    </head>
    <body
      css={css`
        background-color: #0f0f0f;
        color: cornflowerblue;
        display: flex;
        align-items: center;
        flex-direction: column;
      `}
    >
      <Nav currentPath={currentPath} />
      <main>{children}</main>
      <footer
        css={css`
          color: #b0b0b0;
          font-style: oblique;
          position: fixed;
          bottom: 2rem;
        `}
      >
        Copyright 2019 | Ahmad Kanawi
      </footer>
    </body>
  </html>
);

const Index: PageComponent = ({ currentPath }) => (
  <Page currentPath={currentPath}>
    <h1>Welcome to Stance Industries!</h1>
  </Page>
);

const Services: PageComponent = ({ currentPath }) => (
  <Page currentPath={currentPath}>
    <h1>About our services 💻</h1>
  </Page>
);

const Contact: PageComponent = ({ currentPath }) => (
  <Page currentPath={currentPath}>
    <h1>Please talk to us ☎️</h1>
  </Page>
);

const buildPath = path.join(__dirname, "../", "build");
console.log("Removing build directory: ", buildPath);
rimraf.sync(buildPath);
console.log("Creating new build directory.");
mkdirSync(buildPath);

const manifest = [
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
