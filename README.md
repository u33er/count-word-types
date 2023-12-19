# count-word-types
### Rush

[Rush](https://rushjs.io/pages/intro/welcome/) is the scalable monorepo build orchestrator for JavaScript/TypeScript projects. We use it for:

- Incremental and parallel lint/test/build;
- Consistent dependency versions between projects;
- Preparation of self-contained artefacts with dependencies for deploy.

Install globally the exact version defined in `rushVersion` property of `rush.json` on your local machine:

```bash

This is the one and only time we need to use `npm install` in this project. Once the Rush installed we should use `rush add` instead. Before you get started using Rush extensively, please get acquainted with [this guide](https://rushjs.io/pages/developer/new_developer/).

```

#### Upgrading Rush

Rush doesn't have OOTB command to do self upgrade - manual steps involved to upgrade the project:

```bash
# Uninstall globally installed Rush:
$ npm uninstall -g @microsoft/rush
# Install desired Rush version globally:
$ npm install -g @microsoft/rush@{rushVersion}
# Remove temporary files created by previous version of Rush and update:
$ rush purge
$ rush update
```

If the project was already upgraded on remote, just do:

```bash
npm uninstall -g @microsoft/rush
npm install -g @microsoft/rush@{rushVersion} # rushVersion property of rush.json
rush purge
rush update
```

#### Rush FAQ

> `You have encountered a software defect. Please consider reporting the issue to the maintainers of this application.` You might encounter this error after branch checkout or doing the pull. To fix the error, run from the root of a project:

```bash
rush purge
rm -rf common/config/rush/repo-state.json
rush update
```

#### Rush Configs

After initialization, each Rush project contains config files under the common/config/rush folder as JSON format. Each config file contains configuration explanations and commented settings.

The JSON does not support comments in file by default. That's why the default commented lines have been removed rush configs.

If you want to see explanations about config files please visit [official Rush documentation](https://rushjs.io/pages/configs/deploy_json/).

