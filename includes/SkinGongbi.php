<?php

/** 
 * Gongbi Skin
 * includes/GongbiTemplate.php
 * © 2015-2021 Isarra
 * © 2021-2023 WaitSpring
 */

namespace MediaWiki\Skin\Gongbi;

use SkinTemplate;

/**
 * SkinTemplate class for the Gongbi skin
 *
 * @ingroup Skins
 */
class SkinGongbi extends SkinTemplate
{
	/**
	 * @inheritDoc
	 */
	public function __construct(
		array $options = []
	) {
		$out = $this->getOutput();

		parent::__construct($options);
	}
}
