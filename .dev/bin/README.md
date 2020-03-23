# Scripts

These are a collection of scripts used to assist during development and/or deployment of CoBlocks.

## e2e-test-gauntlet.sh

```
bash .dev/bin/e2e-test-gauntlet.sh <specs> <db-user> <db-pass> [db-host] [wordpress-version]
```

This script will setup a local install of a specific version of WordPress (defined by `[wordpress-version]`), install CoBlocks and run our end-to-end testing suite against it. A list of Cypress specs can be passed as the first parameter or an empty string will run all specs.

Because we don't have a docker environment setup for this yet MySQL will need to be installed locally.

### Params


| Param               | Default       | Description                                                                                                                                                              |
| ------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `specs`             |               | **Required.** Comma separated list of paths to each spec file to run. Empty string (`''`) passed will run all specs. Passing `'open'` will open the Cypress application. |
| `db-user`           |               | **Required.**                                                                                                                                                            |
| `db-pass`           |               | **Required.**                                                                                                                                                            |
| `db-host`           | `'localhost'` |                                                                                                                                                                          |
| `wordpress-version` | `'latest'`    |                                                                                                                                                                          |

### Example

Here is an example of running all of the end-to-end tests against WordPress 5.0

```
bash .dev/bin/e2e-test-gauntlet.sh '' root '' localhost '5.0'
```

Here is an example of running only the Accordion block end-to-end tests against the latest version of WordPress.

```
bash .dev/bin/e2e-test-gauntlet.sh 'src/blocks/accordion/test/accordion.cypress.js' root '' localhost
```

OR

```
bash .dev/bin/e2e-test-gauntlet.sh 'src/blocks/accordion/test/accordion.cypress.js' root '' localhost 'latest'
```