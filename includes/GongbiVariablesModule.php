<?php
/** 
 * Gongbi Skin
 * includes/GongbiVariablesModule.php
 * © 2015-2021 Isarra
 * © 2021-2022 WaitSpring
 */
namespace MediaWiki\Skin\Gongbi;

use MediaWiki\ResourceLoader\Context;
use ResourceLoaderSkinModule;

/**
 * ResourceLoader module to set some LESS variables for the skin
 */
class GongbiVariablesModule extends ResourceLoaderSkinModule {
	/**
	 * Add our LESS variables
	 *
	 * @param Context $context
	 * @return array LESS variables
	 */
	protected function getLessVars( Context $context ) {
		$vars = parent::getLessVars( $context );
		// $config = $this->getConfig();

		// Backdrop image (abadoned)
		// $backdrop = $config->get( 'GongbiBackdropImage' );
		// if ( $backdrop === 'cat.svg' ) {
		// 	// expand default
		// 	$backdrop = 'images/cat.svg';
		// }

		return array_merge(
			$vars,
			[
				// 'backdrop-image' => "url($backdrop)",
				// 'logo-image' => ''
				// 'wordmark-image' => ''
				// +width cutoffs ...
			]
		);
	}

	/**
	 * Register the config var with the caching stuff so it properly updates the cache
	 *
	 * @param Context $context
	 * @return array
	 */
	public function getDefinitionSummary( Context $context ) {
		$summary = parent::getDefinitionSummary( $context );
		$summary[] = [];
		
		return $summary;
	}
}
