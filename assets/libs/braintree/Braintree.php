<?php
/**
 * Braintree PHP Library
 * Creates class_aliases for old class names replaced by PSR-4 Namespaces
 *
 * @copyright  2015 Braintree, a division of PayPal, Inc.
 */

require_once(__DIR__ . DIRECTORY_SEPARATOR . 'autoload.php');

if (version_compare(PHP_VERSION, '5.4.0', '<')) {
    throw new Braintree_Exception('PHP version >= 5.4.0 required');
}


function requireDependencies() {
    $requiredExtensions = ['xmlwriter', 'openssl', 'dom', 'hash', 'curl'];
    foreach ($requiredExtensions AS $ext) {
        if (!extension_loaded($ext)) {
            throw new Braintree_Exception('The Braintree library requires the ' . $ext . ' extension.');
        }
    }
}

requireDependencies();

Braintree_Configuration::environment('sandbox');
Braintree_Configuration::merchantId('r8tjk9hz8tfq2fkp');
Braintree_Configuration::publicKey('g6tjz7k4mxthskpz');
Braintree_Configuration::privateKey('80dbbc5fc8a78746348fe3a263e7fa55');