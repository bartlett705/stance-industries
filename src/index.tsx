/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { renderToStaticMarkup } from "react-dom/server";
import { renderStylesToString } from "emotion-server";
import { mkdirSync, writeFileSync } from "fs";
import * as rimraf from "rimraf";
import * as path from "path";
import { FormEvent } from "react";

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
      <NavLink currentPath={currentPath} href="./index.html">
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

const flexCentered = css`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Section: React.FunctionComponent = ({ children }) => (
  <section css={flexCentered}>{children}</section>
);
const SectionTitle: React.FunctionComponent = ({ children }) => (
  <h2>{children}</h2>
);

const Page: React.FunctionComponent<{
  title?: string;
  currentPath: string;
}> = ({ title, currentPath, children }) => (
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
        font-family: sans-serif;
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
          font-family: serif;
        `}
      >
        Copyright 2019 | Ahmad Kanawi
      </footer>
    </body>
  </html>
);

const Index: PageComponent = ({ currentPath }) => (
  <Page currentPath={currentPath}>
    <h1 css={flexCentered}>Welcome to Stance Industries!</h1>
    <Section>
      <SectionTitle>Mission</SectionTitle>
      <p>Providing a nuturing environment for 🐕 of all types.</p>
    </Section>
    <Section>
      <SectionTitle>Vision</SectionTitle>
      <p>Working on this one.</p>
    </Section>
    <Section>
      <SectionTitle>Strategy</SectionTitle>
      <p>
        Syngergizing decentralized systems to enhance customer value, while
        reducing both idiosyncratic and systematic risk.
      </p>
    </Section>
  </Page>
);

const Services: PageComponent = ({ currentPath }) => (
  <Page currentPath={currentPath}>
    <h1 css={flexCentered}>About our services 💻</h1>
    <SectionTitle>Networking</SectionTitle>
    <ul>
      <li>Virtual private servers idled for pennies on the dollar 🖥🛌📉</li>
      <li>Leash-loop installation at competitive rates 🐕🚶</li>
      <li>Custom metrics and user-behavior tracking 💁🗺🕵</li>
    </ul>
    <SectionTitle>Web Development</SectionTitle>
    <ul>
      <li>Amazing styling like you see here 😂</li>
      <li>Vertically-integrated; full-stack and devops available 🏗👷‍♀</li>
      <li>Preferred stack: Typescript📈, Koa, React⚛️, Nginx, Linux🐧</li>
    </ul>
    <SectionTitle>Cocktails</SectionTitle>
    <ul>
      <li>Bespoke bitters macerated to order 🍒🌰🍼</li>
      <li>Custom recipes for any occasion 🎉🎊</li>
    </ul>
  </Page>
);

const FormElement: React.FunctionComponent = ({ children }) => (
  <label css={flexCentered}>{children}</label>
);

const formStyles = css`
  color: #fafafa;
  background-color: black;
  border: 1px solid cornflowerblue;
  border-radius: 0.24rem;
  margin: 0.5rem;
  padding: 0.5rem;
`;

const Contact: PageComponent = ({ currentPath }) => (
  <Page currentPath={currentPath}>
    <h1 css={flexCentered}>Please talk to us ☎️</h1>
    <form css={flexCentered} action="https://chaitown.mosey.systems/forms/si" method="post">
      <Input label={"Your Name"} id="name" required />
      <Input label={"Who Sent You"} id="referral" required />
      <Input label={"How to Reach You"} id="contact" required />
      <FormElement>
        Your Thoughts:
        <textarea
          css={css`
            ${formStyles} 
            width: 30rem;
            height: 5rem;
          `}
          name="content"
          id="content"
        />
      </FormElement>
      <button css={formStyles}>
        <div
          css={css`
            padding: 0.5rem;
          `}
        >
          Submit
        </div>
      </button>
    </form>
  </Page>
);

const Input: React.FunctionComponent<{
  label: string;
  id: string;
  required?: boolean;
}> = ({ label, id }) => (
  <FormElement css={flexCentered}>
    {label}
    <input
      css={css`
        ${formStyles} text-align: center;
      `}
      name={id}
      id={id}
      required
    />
  </FormElement>
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
