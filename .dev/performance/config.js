const gitRepoOwner = 'godaddy-wordpress';

/**
 * @typedef WPPluginCLIConfig
 * @property {string} slug                    Slug.
 * @property {string} name                    Name.
 * @property {string} team                    Github Team Name.
 * @property {string} versionMilestoneFormat  printf template for milestone
 *                                            version name. Expected to be called
 *                                            with a merged object of the config
 *                                            and semver-parsed version parts.
 * @property {string} githubRepositoryOwner   Github Repository Owner.
 * @property {string} githubRepositoryName    Github Repository Name.
 * @property {string} pluginEntryPoint        Plugin Entry Point File.
 * @property {string} buildZipCommand         Build Plugin ZIP command.
 * @property {string} githubRepositoryURL     GitHub Repository URL.
 * @property {string} wpRepositoryReleasesURL WordPress Repository Tags URL.
 * @property {string} gitRepositoryURL        Git Repository URL.
 * @property {string} svnRepositoryURL        SVN Repository URL.
 */

/**
 * @type {WPPluginCLIConfig}
 */
const config = {
	slug: 'coblocks',
	name: 'CoBlocks',
	team: 'GoDaddy WordPress',
	versionMilestoneFormat: '%(name)s %(major)s.%(minor)s',
	githubRepositoryOwner: gitRepoOwner,
	githubRepositoryName: 'coblocks',
	pluginEntryPoint: 'class-coblocks.php',
	githubRepositoryURL: 'https://github.com/' + gitRepoOwner + '/coblocks/',
	wpRepositoryReleasesURL: 'https://github.com/godaddy-wordpress/coblocks/releases/',
	gitRepositoryURL: 'https://github.com/' + gitRepoOwner + '/coblocks.git',
	svnRepositoryURL: 'https://plugins.svn.wordpress.org/coblocks',
};

module.exports = config;
