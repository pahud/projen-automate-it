const { TypeScriptProject } = require('projen');

const project = new TypeScriptProject({
  defaultReleaseBranch: 'main',
  jsiiFqn: "projen.TypeScriptProject",
  name: '@pahud/projen-extensions',
  description: 'Projen extensions common used by Pahud Hsieh',
  releaseBranches: ['main'],
  deps: ['projen'],
  dependabot: false,
});

project.synth();
