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

mw.hook( 'wikipage.content' ).add( ( $content ) => {
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
	const setScrollClass = ( $table ) => {
		const $tableWrapper = $table.parent();
		const $wrapper = $tableWrapper.parent();

		const scroll = Math.abs( $tableWrapper.scrollLeft() ); // wtf browser rtl implementations

		// 1 instead of 0 because of weird rtl rounding errors or something
		if ( scroll > 1 ) {
			$wrapper.addClass( 'scroll-left' );
		} else {
			$wrapper.removeClass( 'scroll-left' );
		}
		if ( $table.outerWidth() - $tableWrapper.innerWidth() - scroll > 1 ) {
			$wrapper.addClass( 'scroll-right' );
		} else {
			$wrapper.removeClass( 'scroll-right' );
		}
	};
	$content.find( '.content-table' ).on( 'scroll', function () {
		setScrollClass( $( this ).children( 'table' ).first() );
		if ( $content.attr( 'dir' ) === 'rtl' ) {
			$( this )
				.find( 'caption' )
				.css( 'margin-right', `${Math.abs( $( this ).scrollLeft() )}px` );
		} else {
			$( this )
				.find( 'caption' )
				.css( 'margin-left', `${$( this ).scrollLeft()}px` );
		}
	} );

	/**
	 * Mark overflowed tables for scrolling
	 */
	const unOverflowTables = () => {
		$content.find( '.content-table > table' ).each( function () {
			const $table = $( this );
			const $wrapper = $table.parent().parent();
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
		$content.find( '.content-table > table > caption' ).each( function () {
			let $container;
			let tableHeight;
			const $table = $( this ).parent();
			const $wrapper = $table.parent().parent();
			if ( $table.outerWidth() > $wrapper.outerWidth() ) {
				$container = $( this ).parents( '.content-table-wrapper' );
				$( this ).width( $content.width() );
				tableHeight = $container.innerHeight() - $( this ).outerHeight();
				$container.find( '.content-table-left' ).height( tableHeight );
				$container.find( '.content-table-right' ).height( tableHeight );
			}
		} );
	};
	unOverflowTables();
	$( window ).on( 'resize', unOverflowTables );

	/**
	 * Sticky scrollbars maybe?!
	 */
	$content.find( '.content-table' ).each( function () {
		const $tableWrapper = $( this );
		const $table = $tableWrapper.children( 'table' ).first();

		// Assemble our silly crap and add to page
		const $scrollbar = $( '<div>' )
			.addClass( 'content-table-scrollbar inactive' )
			.width( $content.width() );
		const $spoof = $( '<div>' )
			.addClass( 'content-table-spoof' )
			.width( $table.outerWidth() );
		$tableWrapper.parent().prepend( $scrollbar.prepend( $spoof ) );
	} );

	/**
	 * Scoll table when scrolling scrollbar and visa-versa lololol wut
	 */
	$content.find( '.content-table' ).on( 'scroll', function () {
		// Only do this here if we're not already mirroring the spoof
		const $mirror = $( this ).siblings( '.inactive' ).first();
		$mirror.scrollLeft( $( this ).scrollLeft() );
	} );
	$content.find( '.content-table-scrollbar' ).on( 'scroll', function () {
		const $mirror = $( this ).siblings( '.content-table' ).first();

		// Only do this here if we're not already mirroring the table
		// eslint-disable-next-line no-jquery/no-class-state
		if ( !$( this ).hasClass( 'inactive' ) ) {
			$mirror.scrollLeft( $( this ).scrollLeft() );
		}
	} );

	/**
	 * Set active when actually over the table it applies to...
	 */
	const determineActiveSpoofScrollbars = () => {
		$content.find( '.overflowed .content-table' ).each( function () {
			const $scrollbar = $( this ).siblings( '.content-table-scrollbar' ).first();
			let captionHeight;

			// Skip caption
			captionHeight = $( this ).find( 'caption' ).outerHeight();
			if ( !captionHeight ) {
				captionHeight = 0;
			} else {
				// Pad slightly for reasons
				captionHeight += 8;
			}
			const tableTop = $( this ).offset().top;
			const tableBottom = tableTop + $( this ).outerHeight();
			const viewBottom = window.scrollY + document.documentElement.clientHeight;
			if ( tableTop + captionHeight < viewBottom && tableBottom > viewBottom ) {
				$scrollbar.removeClass( 'inactive' );
			} else {
				$scrollbar.addClass( 'inactive' );
			}
		} );
	};
	determineActiveSpoofScrollbars();
	$( window ).on( 'scroll resize', determineActiveSpoofScrollbars );

	/**
	 * Make sure tablespoofs remain correctly-sized?
	 */
	$( window ).on( 'resize', () => {
		$content.find( '.content-table-scrollbar' ).each( function () {
			const width = $( this ).siblings().first().find( 'table' ).first().width();
			$( this ).find( '.content-table-spoof' ).first().width( width );
			$( this ).width( $content.width() );
		} );
	} );
} );
