/* eslint-disable no-jquery/no-fade */
/**
 * Gongbi Skin
 * © 2015-2021 Issara
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
/* Popout menus (header) */

'use strict';

$( () => {
	const toggleTime = 150;

	// Open the various menus
	$( '#user-tools h2' ).on( 'click', () => {
		if ( $( window ).width() < 851 ) {
			$( '#personal-inner' ).css(
				'left',
				$( '#personal h2' ).offset().left - $( '#personal-inner' ).width()
			);
			$( '#menus-cover' ).fadeToggle( toggleTime );
			$( '#personal-inner' ).fadeToggle( toggleTime );
		}
	} );
	$( '#sidebar-tools h2' ).on( 'click', () => {
		if ( $( window ).width() < 851 ) {
			$( '#site-navigation .sidebar-inner' ).css(
				'left',
				$( '#sidebar-tools h2' ).offset().left
			);
			$( '#menus-cover' ).fadeToggle( toggleTime );
			$( '#site-navigation .sidebar-inner' ).fadeToggle( toggleTime );
		}
	} );
	$( '#search-button h2' ).on( 'click', () => {
		if ( $( window ).width() < 851 ) {
			$( '#menus-cover' ).fadeToggle( toggleTime );
			$( '#p-search .sidebar-inner' ).fadeToggle( toggleTime );
		}
	} );
	$( '#ca-more' ).on( 'click', () => {
		$( '#page-more .sidebar-inner' ).css( 'top', $( '#ca-more' ).offset().top + 25 );
		if ( $( window ).width() < 851 ) {
			$( '#menus-cover' ).fadeToggle( toggleTime );
			$( '#page-more .sidebar-inner' ).fadeToggle( toggleTime );
		}
	} );
	$( '#ca-tools' ).on( 'click', () => {
		$( '#page-tools .sidebar-inner' ).css(
			'top',
			$( '#ca-tools' ).offset().top + 25
		);
		if ( $( window ).width() < 851 ) {
			$( '#menus-cover' ).fadeToggle( toggleTime );
			$( '#page-tools .sidebar-inner' ).fadeToggle( toggleTime );
		}
	} );
	$( '#ca-languages' ).on( 'click', () => {
		$( '#other-languages .sidebar-inner' ).css(
			'top',
			$( '#ca-languages' ).offset().top + 25
		);
		if ( $( window ).width() < 851 ) {
			$( '#menus-cover' ).fadeToggle( toggleTime );
			$( '#other-languages .sidebar-inner' ).fadeToggle( toggleTime );
		}
	} );

	// Close menus on click outside
	$( document ).on( 'click touchstart', ( e ) => {
		if (
			$( e.target ).closest( '#menus-cover' ).length > 0
		) {
			$( '#personal-inner' ).fadeOut( toggleTime );
			$( '.sidebar-inner' ).fadeOut( toggleTime );
			$( '#menus-cover' ).fadeOut( toggleTime );
		}
	} );
} );
