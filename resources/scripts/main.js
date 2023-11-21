/**
 * Gongbi Skin
 * © 2015-2021 Isarra
 * © 2021-2023 WaitSpring
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

$( function () {
	// sidebar-inner only applies to desktop-small, but the toggles are hidden at
	// other resolutions regardless and the css overrides any visible effects.
	var $dropdowns = $( '#personal, #p-variants-desktop, .sidebar-inner' );

	/**
	 * Desktop menu click-toggling
	 *
	 * We're not even checking if it's desktop because the classes in play have no effect
	 * on mobile regardless... this may break things at some point, though.
	 */

	/**
	 * Close all dropdowns
	 */
	var closeOpen = function closeOpen() {
		$dropdowns.removeClass( 'dropdown-active' );
	};

	/**
	 * Click behaviour
	 */
	$dropdowns.on( 'click', function ( e ) {
		// Check if it's already open so we don't open it again
		// eslint-disable-next-line no-jquery/no-class-state
		if ( $( this ).hasClass( 'dropdown-active' ) ) {
			if ( $( e.target ).closest( $( 'h2, #p-variants-desktop h3' ) ).length > 0 ) {
				// treat reclick on the header as a toggle
				closeOpen();
			}
			// Clicked inside an open menu; don't do anything
		} else {
			closeOpen();
			e.stopPropagation(); // stop hiding it!
			$( this ).addClass( 'dropdown-active' );
		}
	} );
	$( document ).on( 'click', function ( e ) {
		if ( $( e.target ).closest( $dropdowns ).length > 0 ) {
			// Clicked inside an open menu; don't close anything
		} else {
			closeOpen();
		}
	} );
} );
