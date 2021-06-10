import * as projen from 'projen';
import { Automation } from './index';


const project = new projen.AwsCdkConstructLibrary({
  author: 'mock',
  authorAddress: 'm@mock.com',
  cdkVersion: '1.91.0',
  defaultReleaseBranch: 'main',
  name: 'mock',
  repositoryUrl: 'mock',
  outdir: 'out.d',
});

const auto = new Automation(project, {
  automationToken: 'mock',
});

auto.autoApprove()
auto.autoMerge()
project.synth();
