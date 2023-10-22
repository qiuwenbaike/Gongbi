/**
 * Gongbi Skin
 * © 2015-2021 Issara
 * © 2022-2023 WaitSpring
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

/* Popout menus (header) */

/* eslint-disable no-jquery/no-fade */
$( function () {
	var toggleTime = 150;

	// Open the various menus
	$( '#user-tools h2' ).on( 'click', function () {
		if ( $( window ).width() < 851 ) {
			$( '#personal-inner' ).css(
				'left',
				$( '#personal h2' ).offset().left - $( '#personal-inner' ).width()
			);
			$( '#personal .mobile-close-button' )
				.css( 'top', $( '#personal h2' ).offset().top - 4 )
				.css( 'left', $( '#personal h2' ).offset().left );
			$( '#menus-cover' ).fadeToggle( toggleTime );
			$( '#personal-inner' ).fadeToggle( toggleTime );
			$( '#personal .mobile-close-button' ).fadeToggle( toggleTime );
		}
	} );
	$( '#sidebar-tools h2' ).on( 'click', function () {
		if ( $( window ).width() < 851 ) {
			$( '#site-navigation .sidebar-inner' ).css(
				'left',
				$( '#sidebar-tools h2' ).offset().left
			);
			$( '#site-navigation .mobile-close-button' )
				.css( 'top', $( '#sidebar-tools h2' ).offset().top - 4 )
				.css( 'left', $( '#sidebar-tools h2' ).offset().left );
			$( '#menus-cover' ).fadeToggle( toggleTime );
			$( '#site-navigation .sidebar-inner' ).fadeToggle( toggleTime );
			$( '#site-navigation .mobile-close-button' ).fadeToggle( toggleTime );
		}
	} );
	$( '#search-button h2' ).on( 'click', function () {
		if ( $( window ).width() < 851 ) {
			$( '#p-search .mobile-close-button' )
				.css( 'top', $( '#search-button h2' ).offset().top - 4 )
				.css( 'left', $( '#search-button h2' ).offset().left );
			$( '#menus-cover' ).fadeToggle( toggleTime );
			$( '#p-search .sidebar-inner' ).fadeToggle( toggleTime );
			$( '#p-search .mobile-close-button' ).fadeToggle( toggleTime );
		}
	} );
	$( '#ca-more' ).on( 'click', function () {
		$( '#page-more .sidebar-inner' ).css( 'top', $( '#ca-more' ).offset().top + 25 );
		$( '#page-more .mobile-close-button' )
			.css( 'top', $( '#ca-more' ).offset().top - 4 )
			.css( 'left', $( '#ca-more' ).offset().left );
		if ( $( window ).width() < 851 ) {
			$( '#menus-cover' ).fadeToggle( toggleTime );
			$( '#page-more .sidebar-inner' ).fadeToggle( toggleTime );
			$( '#page-more .mobile-close-button' ).fadeToggle( toggleTime );
		}
	} );
	$( '#ca-tools' ).on( 'click', function () {
		$( '#page-tools .sidebar-inner' ).css(
			'top',
			$( '#ca-tools' ).offset().top + 25
		);
		$( '#page-tools .mobile-close-button' )
			.css( 'top', $( '#ca-tools' ).offset().top - 4 )
			.css( 'left', $( '#ca-tools' ).offset().left );
		if ( $( window ).width() < 851 ) {
			$( '#menus-cover' ).fadeToggle( toggleTime );
			$( '#page-tools .sidebar-inner' ).fadeToggle( toggleTime );
			$( '#page-tools .mobile-close-button' ).fadeToggle( toggleTime );
		}
	} );
	$( '#ca-languages' ).on( 'click', function () {
		$( '#other-languages .sidebar-inner' ).css(
			'top',
			$( '#ca-languages' ).offset().top + 25
		);
		$( '#other-languages .mobile-close-button' )
			.css( 'top', $( '#ca-languages' ).offset().top - 4 )
			.css( 'left', $( '#ca-languages' ).offset().left );
		if ( $( window ).width() < 851 ) {
			$( '#menus-cover' ).fadeToggle( toggleTime );
			$( '#other-languages .sidebar-inner' ).fadeToggle( toggleTime );
			$( '#other-languages .mobile-close-button' ).fadeToggle( toggleTime );
		}
	} );

	// Close menus on click outside
	$( document ).on( 'click touchstart', function ( e ) {
		if (
			$( e.target ).closest( '#menus-cover' ).length > 0 ||
      $( e.target ).closest( '.mobile-close-button' ).length > 0
		) {
			$( '#personal-inner' ).fadeOut( toggleTime );
			$( '.sidebar-inner' ).fadeOut( toggleTime );
			$( '#menus-cover' ).fadeOut( toggleTime );
			$( '.mobile-close-button' ).fadeOut( toggleTime );
		}
	} );
} );
