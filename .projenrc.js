const { TypeScriptProject } = require('projen');

const project = new TypeScriptProject({
  defaultReleaseBranch: 'main',
  jsiiFqn: 'projen.TypeScriptProject',
  name: 'projen-automate-it',
  description: 'Projen wrapper for common operations',
  releaseBranches: ['main'],
  deps: ['projen'],
  dependabot: false,
  releaseToNpm: true,
});

project.synth();
