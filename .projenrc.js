const { TypeScriptProject, DependenciesUpgradeMechanism } = require('projen');

const AUTOMATION_TOKEN = 'PROJEN_GITHUB_TOKEN';

const project = new TypeScriptProject({
  defaultReleaseBranch: 'main',
  jsiiFqn: 'projen.TypeScriptProject',
  name: 'projen-automate-it',
  description: 'Projen wrapper for common operations',
  defaultReleaseBranch: 'main',
  deps: ['projen@^0.23'],
  depsUpgrade: DependenciesUpgradeMechanism.githubWorkflow({
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
      secret: AUTOMATION_TOKEN,
    },
  }),
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['pahud'],
  },
  releaseToNpm: true,
});

project.package.addField('resolutions', {
  'trim-newlines': '3.0.1',
});


const common_exclude = ['out.d'];

project.gitignore.exclude(...common_exclude);
project.npmignore.exclude(...common_exclude);


project.synth();

