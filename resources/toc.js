/**
 * Gongbi Skin
 * © 2022 WaitSpring
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */
'use strict';

/* TOC (Left Sidebar) */
$( function () {
	if ( $( '#toc' ).length !== 0 ) {
		var $div = $( '<div>' ).attr( 'id', 'site-toc' ).addClass( 'sidebar-chunk' ),
			$title = $( '#mw-toc-heading' ).html(),
			$titleH2 = $( '<h2><span>' + $title + '</span></h2>' ),
			$titleH3 = $( '<h3 id="p-toc-label">' + $title + '</h2>' ),
			$divInner = $( '<div>' ).addClass( 'sidebar-inner' ),
			$divPortlet = $( '<div>' ).attr( 'id', 'p-toc' ).attr( 'role', 'navigation' ).attr( 'aria-labelledby', 'p-toc-label' ).addClass( 'mw-portlet' ),
			$portletBody = $( '<ul>' ).addClass( 'mw-portlet-body' ),
			$tocUl = $( '#toc>ul' ).html();
		$div.append( $titleH2 ).append( $divInner.append( $divPortlet.append( $titleH3 ).append( $portletBody.append( $tocUl ) ) ) ).appendTo( $( '#mw-site-navigation' ) );
	}
} );
