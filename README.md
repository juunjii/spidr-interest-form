# Website Link

https://juunjii.github.io/spidr-interest-form/

# Project Structure

```
📦
├─ .github
│  └─ workflows
│     └─ nextjs.yml
├─ .gitignore
├─ README.md
├─ app
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
├─ components
│  ├─ InterestForm.tsx
│  └─ index.ts
├─ eslint.config.mjs
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
└─ tsconfig.json
```

## Frameworks used

    - Next.js
    - Tailwind CSS

# Design

This section outlines the design decisions behind the development of the interest form for Spidr Design's air fryer landing page. It covers the overall component structure, user interface styling choices inspired by Spidr’s visual identity, and the form’s interactivity and validation logic. Additionally, it highlights how accessibility and user experience were considered in the implementation, and concludes with potential improvements for scalability, maintainability, and production readiness.

## 1. Visual Identity

- To align with Spidr Design’s branding, I identified three primary colors used prominently on their landing page: dark gray, cyan, and white. These colors were incorporated into the interest form to maintain visual cohesion.
- To further reflect Spidr’s minimalistic and modern design language (as seen on the root landing page), I made conscious typography choices:

  - The **Raleway** font was used for consistency.
  - Form labels adopt the same font weight as regular paragraph text.
  - The submit button uses a medium font weight `font-weight: 400`.
  - Headings used, like `<h1>` are styled with a light font weight `font-weight: 200`

- These choices ensure that the form feels like a natural extension of the existing page.

## 2. Resuability, Readability, Customization

- For maintainable and scalable styling, I leveraged Tailwind CSS’s layering system and custom theming. Styles are organized into three logical layers—base, components, and utilities, each serving a specific purpose:

  1. `@layer base`: Encapsulates global resets and theme defaults in a Tailwind-native way. This layer helps define consistent base styles like font defaults or input resets across the app.

  2. `@layer components`: Promotes reuse and avoids redundancy (DRY principle) by defining reusable styling blocks for common UI elements like form inputs and buttons.

  3. `@layer utilities`: Includes custom utility classes for animations and transitions, which are particularly useful for smooth visual feedback during form submission and reset actions. It also allows easy addition or removal of effects without modifying component logic.

- Additionally, I defined theme variables within the `@theme` directive to centralize the control of color schemes, font weights, and transition effects. This improves customization flexibility and reduces duplication when updating styles.
- When using `@apply`, I was intentional not to over-abstract styling logic. It’s only used when there’s repeated styling across elements (e.g., inputs, labels, buttons). By keeping most styling inline using Tailwind utility classes in the `.tsx` file, I preserve declarative readability and avoid "style-context hunting" during future maintenance, ensuring the styles remain intuitive and easy to modify without bloating the CSS.

## 3. User Experience

- User experience was a top consideration in designing the form. To make it intuitive and user-friendly:

  - Placeholder text was added to each input field to indicate expected input formats (e.g., phone number, email).

  - Native HTML validation (such as required, pattern, and type) is included to enforce baseline input correctness—like ensuring phone numbers are between 10 and 15 digits.

  - Upon submission, the form dynamically transitions into a friendly confirmation message, reassuring the user that their entry was received and offering a clear path to submit another.
 
- Moreover, I've also ensured that the interest form is responsive to various screen sizes, so that users would still be able to perform form submissions regardless of what device they choose to use. 

These small but thoughtful choices collectively enhance usability and create a smooth interaction flow aligned with Spidr’s fun brand identity (the GIFs behind the profile pictures were a neat touch🤪).

## 4. Extensibility

- I've decided to include the `useCallback` hook, to optimize performance and future-proof the form componenet, specifically to memoize the event handler functions- `handleChange` and `handleSubmit`, which would be useful when the form gets refactored to include child compoennts, and stable function identities can prevent unnecessary re-renders when passed as props.
- I've also included a centralized bundle file - `index.ts` to export components (although there's just one component for now). However, when the project gets extended with more components, this bundling approach allows multiple exports from a single directory to be accessed via a concise import path, reducing the need for long, repetitive relative imports like `../../../components/InputField`. This approach aims to allow for better scalability and maintainability, helping to keep imports clean and the project modular.

## Reflection/Considerations

1. `useCallBack` Hook

While the `useCallback` hook may not be strictly necessary for this simple, self-contained form (lack of child components), this component is designed with scalability in mind, ensuring smoother performance and making it easier to integrate with memoized components.

By wrapping the event handlers in this hook, React will preserve the same reference across renders unless its dependencies change. This allows memoized child components to skip re-renders whne nothing meaningul has changed, avoiding wasted computation, and improves performance.

Hence, including it at this stage is to future-proof the component, given that its inclusion does not incur significant overhead.

2. Further Modularization

While each input field is currently implemented directly within the `<InterestForm/>` component, there was consideration given to further modularizing the form by extracting repeated UI patterns (such as labeled input fields) into reusable subcomponents like `<FormFields />`.

This would improve maintainability, especially in larger applications where field types, validation logic, or UI elements may vary across different forms. However, given the current requirements, a single-purpose, lightweight form embedded at the bottom of a landing page—such componentization was deemed unnecessary and potentially over-engineered. The simplicity of having all logic and markup in one place improves readability and aligns with the scope of the project.

That said, if this form evolves in complexity or is reused elsewhere, breaking it down into smaller, reusable components would be a natural next step.
