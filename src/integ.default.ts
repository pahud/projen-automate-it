import * as projen from 'projen';
import { Automation } from './index';

const project = new projen.AwsCdkConstructLibrary({
  name: 'foo',
  author: 'pahud',
  authorAddress: 'mock@mock.com',
  cdkVersion: '1.0',
  repositoryUrl: 'mock',
  defaultReleaseBranch: 'master',
  outdir: './out.d',
});



const auto = new Automation(project, {
  automationToken: 'mock',
})

auto.projenYarnUpgrade({ yarnTest: true })

// workflow.synthesize()
project.synth()
