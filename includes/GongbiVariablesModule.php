<?php

/** 
 * Gongbi Skin
 * includes/GongbiTemplate.php
 * © 2015-2021 Isarra
 * © 2021-2024 WaitSpring
 */

namespace MediaWiki\Skin\Gongbi;

use MediaWiki\ResourceLoader\Context;
use MediaWiki\ResourceLoader\SkinModule;

/**
 * ResourceLoader module to set some LESS variables for the skin
 */
class GongbiVariablesModule extends SkinModule
{
	/**
	 * Add our LESS variables
	 *
	 * @param Context $context
	 * @return array LESS variables
	 */
	protected function getLessVars(Context $context)
	{
		$vars = parent::getLessVars($context);
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
	 * @param Context $context
	 * @return array
	 */
	public function getDefinitionSummary(Context $context)
	{
		$summary = parent::getDefinitionSummary($context);

		return $summary;
	}
}
