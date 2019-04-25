/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { flexCentered } from "./styles";

const NavLink: React.SFC<{
  href: string;
  currentPath: string;
}> = ({ href, currentPath, children }) => (
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

const Nav: React.SFC<{
  currentPath: string;
}> = ({ currentPath }) => (
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
export const Section: React.FunctionComponent = ({ children }) => (
  <section css={flexCentered}>{children}</section>
);
export const SectionTitle: React.FunctionComponent = ({ children }) => (
  <h2>{children}</h2>
);
export const FormElement: React.FunctionComponent = ({ children }) => (
  <label css={flexCentered}>{children}</label>
);
export type PageComponent = React.FunctionComponent<{
  currentPath: string;
}>;

export const Page: React.FunctionComponent<{
  title?: string;
  currentPath: string;
}> = ({ title, currentPath, children }) => (
  <html>
    <head>
      <title>{process.env.SITENAME}{title && `| ${title}`}</title>
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
