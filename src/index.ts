import * as pr from 'projen';

export interface AutomationProps {
  /**
   * The github token for automation
   *
   * @default - GITHUB_TOKEN
   */
  readonly automationToken?: string;
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
}
