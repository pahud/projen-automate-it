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

const common_exclude = ['out.d'];

project.gitignore.exclude(...common_exclude);
project.npmignore.exclude(...common_exclude);


project.synth();

