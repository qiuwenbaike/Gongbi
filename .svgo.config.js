'use strict';
/**
 * SVGO Configuration
 * Compatible to v3.0.0+
 * Recommended options from:
 * https://www.mediawiki.org/wiki/Manual:Coding_conventions/SVG#Exemplified_safe_configuration
 */

module.exports = {
	js2svg: {
		eol: 'lf',
		finalNewline: false,
		indent: '\t'
	},
	multipass: true,
	plugins: [
		{
			name: 'preset-default',
			params: {
				overrides: {
					cleanupIds: false,
					removeDesc: false,
					// If the SVG doesn't start with an XML declaration, then its MIME type will
					// be detected as "text/plain" rather than "image/svg+xml" by libmagic and,
					// consequently, MediaWiki's CSSMin CSS minifier. libmagic's default database
					// currently requires that SVGs contain an XML declaration:
					// https://github.com/threatstack/libmagic/blob/master/magic/Magdir/sgml#L5
					removeXMLProcInst: false
				}
			}
		},
		'removeRasterImages',
		'sortAttrs'
	]
};
