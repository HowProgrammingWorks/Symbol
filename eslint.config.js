'use strict';

const init = require('eslint-config-metarhia');

init[0].rules['no-dupe-keys'] = 'off';
init[0].rules['no-self-compare'] = 'off';
init[0].rules['consistent-return'] = 'off';

module.exports = init;
