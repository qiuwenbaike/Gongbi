/* eslint-disable no-jquery/variable-pattern */
$( function () {
	if ( $( '#toc' ).length !== 0 ) {
		var div = $( '<div>' ).attr( 'id', 'site-toc' ).addClass( 'sidebar-chunk' ),
			title = $( '#mw-toc-heading' ).html(),
			titleH2 = $( '<h2><span>' + title + '</span></h2>' ),
			titleH3 = $( '<h3 id="p-toc-label">' + title + '</h2>' ),
			divInner = $( '<div>' ).addClass( 'sidebar-inner' ),
			divPortlet = $( '<div>' ).attr( 'id', 'p-toc' ).attr( 'role', 'navigation' ).attr( 'aria-labelledby', 'p-toc-label' ).addClass( 'mw-portlet' ),
			portletBody = $( '<ul>' ).addClass( 'mw-portlet-body' ),
			tocUl = $( '#toc>ul' ).html();
		div.append( titleH2 ).append( divInner.append( divPortlet.append( titleH3 ).append( portletBody.append( tocUl ) ) ) ).appendTo( $( '#mw-site-navigation' ) );
	}
} );
