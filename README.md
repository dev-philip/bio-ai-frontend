# Bio x AI Hackathon

Utilizing Knowledge Graphs for the Detection of Potential Null Results

# Problem Statement:

The "null result bias" in scientific publishing leads to the underreporting of experiments that fail to reject the null hypothesis. Read The File Drawer Problem for more information. This lack of transparency can result in wasted research effort and hinder scientific progress. While direct evidence of null results is often absent, subtle contextual clues within published manuscripts and patterns in knowledge graphs may reveal potential areas where hypotheses have not been validated.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

# To start the dev server

1. Run `yarn install` to install all dependencies
2. Create `.env` in root project. Ask admin for env content
3. `yarn dev` to start the server

## Example of git workflow

# 1. Create and switch to the new branch

git checkout -b nlp-pipeline

# 2. Now you're on nlp-pipeline branch. Just add and commit your changes:

git add .
git commit -m "Initial commit for NLP pipeline"

# 3. Push the branch to remote

git push origin nlp-pipeline

# 4. Switch back to the main branch

git checkout main

# 5. Pull latest changes from remote (optional, to sync)

git pull origin main

# 6. Merge the changes from nlp-pipeline into main

git merge nlp-pipeline

# 7.

git push origin main
