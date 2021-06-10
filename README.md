# THIS PROJECT IS DEPRECATED

As projen has built-in `upgrade-dependencies` and `auto-approve` workflows support. We are deprecating this project and will archive this project soon.

# About

`projen-automate-it` is a tiny library that helps you generate workflow snippets for [projen](https://github.com/projen/projen).

# ProjenYarnUpgrade workflow

Previously introduced in this module. Now it's deprecated. Please use the [dependency upgrade workflow](https://github.com/projen/projen/pull/652) from projen instead.


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
```
