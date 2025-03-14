/**
 * Gongbi Skin
 * © 2022-2024 WaitSpring
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

$( () => {
	if ( $( '#toc>ul' ).length !== 0 ) {
		/* TOC (Left) */
		const $div = $( '<div>' ).attr( 'id', 'site-toc' ).addClass( 'sidebar-chunk' ),
			$title = $( '#mw-toc-heading' ).html(),
			$titleH2 = $( '<h2>' ).append( $( '<span>' ).text( $title ) ),
			$titleH3 = $( '<h3>' ).attr( 'id', 'p-toc-label' ).text( $title ),
			$divInner = $( '<div>' ).addClass( 'sidebar-inner' ),
			$divPortlet = $( '<div>' ).attr( {
				id: 'p-toc',
				class: 'mw-portlet',
				role: 'navigation',
				'aria-labelledby': 'p-toc-label'
			} ),
			$portletBody = $( '<ul>' ).addClass( 'mw-portlet-body' ),
			$tocUl = $( '#toc>ul' ).html();
		$div
			.append( $titleH2 )
			.append(
				$divInner.append(
					$divPortlet.append( $titleH3 ).append( $portletBody.append( $tocUl ) )
				)
			)
			.appendTo( $( '#mw-site-navigation' ) );

		/* TOC (Right) */
		const $divNavi = $( '<div>' ).attr( 'id', 'mw-toc-navigation' ),
			$divRight = $( '<div>' )
				.attr( 'id', 'site-toc-right' )
				.addClass( 'sidebar-chunk' ),
			$titleRight = $( '#mw-toc-heading' ).html(),
			$titleH2Right = $( '<h2>' ).append( $( '<span>' ).text( $titleRight ) ),
			$titleH3Right = $( '<h3>' )
				.attr( 'id', 'p-toc-right-label' )
				.text( $titleRight ),
			$divInnerRight = $( '<div>' ).addClass( 'sidebar-inner' ),
			$divPortletRight = $( '<div>' ).attr( {
				id: 'p-toc-right',
				class: 'mw-portlet',
				role: 'navigation',
				'aria-labelledby': 'p-toc-label'
			} ),
			$portletBodyRight = $( '<ul>' ).addClass( 'mw-portlet-body' ),
			$tocUlRight = $( '#toc>ul' ).html();
		$divNavi
			.append(
				$divRight
					.append( $titleH2Right )
					.append(
						$divInnerRight.append(
							$divPortletRight
								.append( $titleH3Right )
								.append( $portletBodyRight.append( $tocUlRight ) )
						)
					)
			)
			.insertAfter( $( '#mw-related-navigation' ) );
	}
} );
