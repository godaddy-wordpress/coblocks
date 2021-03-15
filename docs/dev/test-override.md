# Run All Tests Override
CoBlocks tests are setup to perform a check against changed files to determine which tests should run. There are situations where the existing configuration should be disabled such as when making sweeping changes, or when updating software versions. CoBlocks now supports the ability to force Continuous Integration to run all tests based on branch naming convention.

To force all tests your branch must contain the string

**`run-all-tests`**

Here are a few example branch names:
- 'try/wordpress-rc2-**run-all-tests**'
- 'enhance/major-things-**run-all-tests**'
- 'fix/bugs-**run-all-tests**'