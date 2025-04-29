<?php
// This file is generated. Do not modify it manually.
return array(
	'picker' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'mp-blocks/term-picker-block',
		'version' => '0.1.0',
		'title' => 'Term Picker Block',
		'category' => 'widgets',
		'icon' => 'tag',
		'description' => 'Select and display a taxonomy term.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'attributes' => array(
			'selectedTaxonomy' => array(
				'type' => 'string'
			)
		),
		'textdomain' => 'term-picker-block',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	)
);
