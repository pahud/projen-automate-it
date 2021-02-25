# About

`projen-automate-it` is a tiny library that helps you generate workflow snippets for [projen](https://github.com/projen/projen).

# Sample

```ts
const { Automation } = require('projen-automate-it');

const automation = new Automation(project, {
  automationToken: AUTOMATION_TOKEN,
});

// generate auto-approve workflow
automation.autoApprove();
// generate auto-merge workflow
automation.autoMerge();
// generate auto yarn and projen upgrade workflow
automation.projenYarnUpgrade();
```
