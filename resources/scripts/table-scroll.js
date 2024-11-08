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

'use strict';

mw.hook( 'wikipage.content' ).add( function ( $content ) {
	// Skip on Special:Recentchanges
	if ( mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Recentchanges' ) {
		return;
	}

	// Gotta wrap them for this to work; maybe later the parser etc will do this for us?!
	$content
		.find( 'div > table:not( table table )' )
		.wrap(
			'<div class="content-table-wrapper"><div class="content-table"></div></div>'
		);
	$content
		.find( '.content-table-wrapper' )
		.prepend(
			'<div class="content-table-left"></div><div class="content-table-right"></div>'
		);

	/**
	 * Set up borders for experimental overflowing table scrolling
	 *
	 * I have no idea what I'm doing.
	 *
	 * @param {jQuery} $table
	 */
	function setScrollClass( $table ) {
		var $tableWrapper = $table.parent(),
			// wtf browser rtl implementations
			scroll = Math.abs( $tableWrapper.scrollLeft() );

		$tableWrapper.parent()
			// 1 instead of 0 because of weird rtl rounding errors or something
			.toggleClass( 'scroll-left', scroll > 1 )
			.toggleClass( 'scroll-right', $table.outerWidth() - $tableWrapper.innerWidth() - scroll > 1 );
	}
	$content.find( '.content-table' ).on( 'scroll', function () {
		setScrollClass( $( this ).children( 'table' ).first() );
		if ( $content.attr( 'dir' ) === 'rtl' ) {
			$( this )
				.find( 'caption' )
				.css( 'margin-right', Math.abs( $( this ).scrollLeft() ) + 'px' );
		} else {
			$( this )
				.find( 'caption' )
				.css( 'margin-left', $( this ).scrollLeft() + 'px' );
		}
	} );

	/**
	 * Mark overflowed tables for scrolling
	 */
	function unOverflowTables() {
		$content.find( '.content-table > table' ).each( function ( _index, element ) {
			var $table = $( element ),
				$wrapper = $table.parent().parent();
			if ( $table.outerWidth() > $wrapper.outerWidth() ) {
				$wrapper.addClass( 'overflowed' );
				setScrollClass( $table );
			} else {
				$wrapper.removeClass(
					'overflowed scroll-left scroll-right fixed-scrollbar-container'
				);
			}
		} );

		// Set up sticky captions
		$content.find( '.content-table > table > caption' ).each( function ( _index, element ) {
			var $container, tableHeight;
			var $table = $( element ).parent(),
				$wrapper = $table.parent().parent();
			if ( $table.outerWidth() > $wrapper.outerWidth() ) {
				$container = $( element ).parents( '.content-table-wrapper' );
				$( element ).width( $content.width() );
				tableHeight = $container.innerHeight() - $( element ).outerHeight();
				$container.find( '.content-table-left' ).height( tableHeight );
				$container.find( '.content-table-right' ).height( tableHeight );
			}
		} );
	}
	unOverflowTables();
	$( window ).on( 'resize', unOverflowTables );

	/**
	 * Sticky scrollbars maybe?!
	 */
	$content.find( '.content-table' ).each( function ( _index, element ) {
		var $tableWrapper = $( element );
		var $table = $tableWrapper.children( 'table' ).first();

		// Assemble our silly crap and add to page
		var $scrollbar = $( '<div>' )
			.addClass( 'content-table-scrollbar inactive' )
			.width( $content.width() );
		var $spoof = $( '<div>' )
			.addClass( 'content-table-spoof' )
			.width( $table.outerWidth() );
		$tableWrapper.parent().prepend( $scrollbar.prepend( $spoof ) );
	} );

	/**
	 * Scoll table when scrolling scrollbar and visa-versa lololol wut
	 */
	$content.find( '.content-table' ).on( 'scroll', function () {
		// Only do this here if we're not already mirroring the spoof
		var $mirror = $( this ).siblings( '.inactive' ).first();
		$mirror.scrollLeft( $( this ).scrollLeft() );
	} );
	$content.find( '.content-table-scrollbar' ).on( 'scroll', function () {
		var $mirror = $( this ).siblings( '.content-table' ).first();

		// Only do this here if we're not already mirroring the table
		// eslint-disable-next-line no-jquery/no-class-state
		if ( !$( this ).hasClass( 'inactive' ) ) {
			$mirror.scrollLeft( $( this ).scrollLeft() );
		}
	} );

	/**
	 * Set active when actually over the table it applies to...
	 */
	function determineActiveSpoofScrollbars() {
		$content.find( '.overflowed .content-table' ).each( function () {
			var $scrollbar = $( this ).siblings( '.content-table-scrollbar' ).first();

			// Skip caption
			var captionHeight = $( this ).find( 'caption' ).outerHeight() || 0;
			if ( captionHeight ) {
				// Pad slightly for reasons
				captionHeight += 8;
			}

			var tableTop = $( this ).offset().top,
				tableBottom = tableTop + $( this ).outerHeight(),
				viewBottom = window.scrollY + document.documentElement.clientHeight,
				active = tableTop + captionHeight < viewBottom && tableBottom > viewBottom;
			$scrollbar.toggleClass( 'inactive', !active );
		} );
	}
	determineActiveSpoofScrollbars();
	$( window ).on( 'scroll resize', determineActiveSpoofScrollbars );

	/**
	 * Make sure tablespoofs remain correctly-sized?
	 */
	$( window ).on( 'resize', function () {
		$content.find( '.content-table-scrollbar' ).each( function ( _index, element ) {
			var width = $( element ).siblings().first().find( 'table' ).first().width();
			$( element ).find( '.content-table-spoof' ).first().width( width );
			$( element ).width( $content.width() );
		} );
	} );
} );
