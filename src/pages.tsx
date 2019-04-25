/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { flexCentered, formStyles } from "./styles";
import { PageComponent, Page, Section, SectionTitle, FormElement } from "./site";

export const Index: PageComponent = ({ currentPath }) => (
  <Page currentPath={currentPath}>
    <h1 css={flexCentered}>Welcome to {process.env.SITENAME}!</h1>
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

export const Services: PageComponent = ({ currentPath }) => (
  <Page currentPath={currentPath} title="Services">
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

export const Contact: PageComponent = ({ currentPath }) => (
  <Page currentPath={currentPath} title="Contact">
    <h1 css={flexCentered}>Please talk to us ☎️</h1>
    <form
      css={flexCentered}
      action={process.env.FORM_ACTION}
      method="post"
    >
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
