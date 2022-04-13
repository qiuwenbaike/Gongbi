<?php

namespace MediaWiki\Skin\Timeless;

use ResourceLoaderContext;
use ResourceLoaderSkinModule;

/**
 * ResourceLoader module to set some LESS variables for the skin
 */
class TimelessVariablesModule extends ResourceLoaderSkinModule {
	/**
	 * Add our LESS variables
	 *
	 * @param ResourceLoaderContext $context
	 * @return array LESS variables
	 */
	protected function getLessVars( ResourceLoaderContext $context ) {
		$vars = parent::getLessVars( $context );
		$config = $this->getConfig();

		return array_merge(
			$vars,
			[
				// 'logo-image' => ''
				// 'wordmark-image' => ''
				// +width cutoffs ...
			]
		);
	}

	/**
	 * Register the config var with the caching stuff so it properly updates the cache
	 *
	 * @param ResourceLoaderContext $context
	 * @return array
	 */
	public function getDefinitionSummary( ResourceLoaderContext $context ) {
		$summary = parent::getDefinitionSummary( $context );
		$summary[] = [];
		
		return $summary;
	}
}
