/**
 * Custom dividers
 */
const dividers = {};

dividers.angled =
<svg className="divider--angled" aria-hidden xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><polygon points="0,100 100,0 100,100"/></svg>

dividers.sloped =
<svg className="divider--sloped" aria-hidden xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0 100 C 20 0 50 0 100 100 Z"></path></svg>

dividers.waves =
<svg className="divider--waves" height="100%" viewBox="0 0 100 10" width="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="m42.19.65c2.26-.25 5.15.04 7.55.53 2.36.49 7.09 2.35 10.05 3.57 7.58 3.22 13.37 4.45 19.26 4.97 2.36.21 4.87.35 10.34-.25s10.62-2.56 10.62-2.56v-6.91h-100.01v3.03s7.2 3.26 15.84 3.05c3.92-.07 9.28-.67 13.4-2.24 2.12-.81 5.22-1.82 7.97-2.42 2.72-.63 3.95-.67 4.98-.77z" fill-rule="evenodd" transform="matrix(1 0 0 -1 0 10)"/></svg>

dividers.triangle =
<svg className="divider--triangle" height="100%" viewBox="0 0 100 100" width="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="m0 0 50 100 50-100z" fill-rule="evenodd" transform="matrix(1 0 0 -1 0 100)"/></svg>

dividers.rounded =
<svg className="divider--rounded" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" width="100%" height="100%" viewBox="0 0 240 24" enable-background="new 0 0 240 24" preserveAspectRatio="none">
	<path d="M119.849,0C47.861,0,0,24,0,24h240C240,24,191.855,0.021,119.849,0z"/>
</svg>

dividers.mountains =
<svg className="divider--mountains" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
    <polygon points="0,0 30,100 65,21 90,100 100,75 100,100 0,100"/>
    <polygon points="0,0 15,100 33,21 45,100 50,75 55,100 72,20 85,100 95,50 100,80 100,100 0,100" />
</svg>

export default dividers;
