# CoBlocks Release Process

## Schedule

We release a new version every two weeks with the release day being a Monday. The next version is [tracked in GitHub milestones](https://github.com/godaddy-wordpress/coblocks/milestones) along with each versions scheduled tagging date.

If critical bugs are discovered on stable versions of the plugin, patch versions can be released at any time.

## Writing the Readme and Changelog

First, make sure you have pulled down the latest changes from the `master` branch and all tests are passing in CircleCI.

To generate a changelog for the release, install and use the [changelog generator tool](https://github.com/tj/git-extras/blob/master/Installation.md) from `git-extras`:

```
git changelog --tag x.x.x
```

"x.x.x" should be replaced with the next semantic version number and should always include the three digits.

The script will output a generated changelog, grouped by pull request label. You will need to manually review and curate the changelog entries.

To assist with formatting and removal of superfluous characters you may use the following search/replace regex to remove unwanted spacing and entries as well as automating links back to the PR on GitHub. Most IDE's have the functionality to search and replace via regex, so this is how you can accomplish it:

| Search for     | Replace with | Description
| ----------- | ----------- | ----------- |
| `\(#([0-9]+)\)` | `[#$1](https://github.com/godaddy-wordpress/coblocks/pull/$1)` | Generate PR Links
| `^ {2}\* \[skip ci\].*` | | Remove CI Automation Message |
| `^ {2}\* GoLF.*` | | Remove Translation Message |
| `(^ {2})(\*.*$)(\n*)` | `$2\n` | Remove empty lines and preceeding spaces |


Guidelines for proof-reading include:

- Fix spelling errors or clarify wording. Phrasing should be easy to understand where the intended audience are those who use the plugin or are keeping up with ongoing development.
- Create new groupings as applicable, and move pull requests between. We categorize changes into "Enhancements", "Bug Fixes", and "Misc" (for toolset, deployment, and changes not important for the end user).
- When multiple pull requests relate to the same task (such as a follow-up pull request), try to combine them to a single entry.

Finally replace the latest changelog added at the end of the readme file with this updated one. And commit to master (don't push yet).

## Preparing the Milestone in GitHub

For every release, there is a milestone on GitHub containing all of the merged Pull Requests for that release cycle. 

1. Open the [current milestone](https://github.com/godaddy-wordpress/coblocks/milestones) in GitHub.
2. Edit the milestone title to the new release's version number, following the "x.x.x" convention discussed above
3. Close the milestone.
4. Create a new milestone, with the title "Next Release".
5. Set the milestone's due date to two Mondays into the future.

## Deploying the release

To deploy a new release, simply run the following command:

```
npm version major|minor|patch
```

Replace "major|minor|patch" with the actual semver release type.

This command will:

1. bump all version numbers within the plugin source code.
2. build and minify the necessary scripts.
3. create a tag with the release version number.
4. push everything up to GitHub.

CircleCI will takeover when it detects the new tag and will publish the compiled plugin to the WordPress plugin repo as well as create a [release in GitHub](https://github.com/godaddy-wordpress/coblocks/releases).

Ta-da! 🎉
