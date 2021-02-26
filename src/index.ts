import * as pr from 'projen';

export interface AutomationProps {
  /**
   * The github token for automation
   *
   * @default - GITHUB_TOKEN
   */
  readonly automationToken?: string;
}

interface projenYarnUpgradeOptions {
  /**
   * run `yarn test`
   * @default false
   */
  readonly yarnTest?: boolean;
}

export class Automation {
  readonly project: pr.Project;
  readonly automationToken: string;
  constructor(project: pr.Project, props: AutomationProps = {}) {
    this.project = project;
    this.automationToken = props.automationToken ?? 'GITHUB_TOKEN';
  }
  public autoMerge() {
    if (this.project.github) {
      // auto merge workflow
      const autoMerge = this.project.github.addWorkflow('AutoMerge');

      autoMerge.on({
        pull_request: {
          types: ['labeled', 'opened', 'reopened'],
        },
        check_suite: {
          types: ['completed'],
        },
        status: {},
      });

      autoMerge.addJobs({
        automerge: {
          'runs-on': 'ubuntu-latest',
          'steps':
            [
              {
                name: 'automerge',
                uses: 'pascalgn/automerge-action@v0.13.1',
                env: {
                  GITHUB_TOKEN: '${{ secrets.GITHUB_TOKEN }}',
                  MERGE_LABELS: 'auto-merge,!wip,!work in progress,!do-not-merge',
                  MERGE_RETRY_SLEEP: '60000',
                  MERGE_DELETE_BRANCH: 'true',
                  MERGE_METHOD: 'squash',
                },
              },
            ],
        },
      });
    };
  };
  public autoApprove() {
    if (this.project.github) {
      const autoApprove = this.project.github.addWorkflow('AutoApprove');

      autoApprove.on({
        pull_request_target: {
          types: ['assigned', 'opened', 'synchronize', 'reopened'],
        },
      });

      autoApprove.addJobs({
        'auto-approve': {
          'runs-on': 'ubuntu-latest',
          'steps':
            [
              {
                uses: 'hmarr/auto-approve-action@v2.0.0',
                if: "github.actor == 'pahud' || contains( github.event.pull_request.labels.*.name, 'auto-approve')",
                with: {
                  'github-token': '${{ secrets.GITHUB_TOKEN }}',
                },
              },
            ],
        },
      });
    };
  };

  public projenYarnUpgrade(id: string = 'ProjenYarnUpgrade', opts: projenYarnUpgradeOptions = {}) {
    if (this.project.github) {
      const projenYarnUpgrade = this.project.github.addWorkflow(id);

      projenYarnUpgrade.on({
        schedule: [{
          cron: '11 0 * * *',
        }], // 0:11am every day
        workflow_dispatch: {}, // allow manual triggering
      });

      const steps = [];
      steps.push({ uses: 'actions/checkout@v2' });
      steps.push({
        uses: 'actions/setup-node@v1',
        with: { 'node-version': '10.17.0' },
      });
      steps.push({ run: 'yarn upgrade' });
      steps.push({ run: 'yarn projen:upgrade' });
      // conditionally run the test
      if (opts.yarnTest) {
        steps.push({ run: 'yarn test' });
      }
      // submit a PR
      steps.push({
        name: 'Create Pull Request',
        uses: 'peter-evans/create-pull-request@v3',
        with: {
          'token': '${{ secrets.' + this.automationToken + ' }}',
          'commit-message': 'chore: upgrade projen',
          'branch': 'auto/projen-upgrade',
          'title': 'chore: upgrade projen and yarn',
          'body': 'This PR upgrades projen and yarn upgrade to the latest version',
          'labels': 'auto-merge,auto-approve',
        },
      });

      projenYarnUpgrade.addJobs({
        upgrade: {
          'runs-on': 'ubuntu-latest',
          'steps': steps,
        },
      });
    }
  }
}
