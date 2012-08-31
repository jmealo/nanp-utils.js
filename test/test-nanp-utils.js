var assert = require('assert');
var nanp = require('../lib/nanp-utils.js');

assert.throws(nanp.decodeVanity(''));
assert.throws(nanp.decodeVanity(null));
assert.throws(nanp.decodeVanity());
assert.throws(nanp.decodeVanity(17322919635));
assert.throws(nanp.decodeVanity({}));
assert.throws(nanp.decodeVanity([]));

assert.throws(nanp.formatPhone(''));
assert.throws(nanp.formatPhone(null));
assert.throws(nanp.formatPhone());
assert.throws(nanp.formatPhone(17322919635));
assert.throws(nanp.formatPhone([]));
assert.throws(nanp.formatPhone({}));

assert.throws(nanp.formatPhone('(732) 291-9635', ''));
assert.throws(nanp.formatPhone('(732) 291-9635', null));
assert.throws(nanp.formatPhone('(732) 291-9635'));
assert.throws(nanp.formatPhone('(732) 291-9635', 17322919635));
assert.throws(nanp.formatPhone('(732) 291-9635', []));
assert.throws(nanp.formatPhone('(732) 291-9635', {}));
assert.throws(nanp.formatPhone('(732) 291-9635', 'QQQ-ZZZ-WWWW'));

assert.equal(nanp.formatPhone('1-800-JEFF-NOW', 'I-AAA-BBB-CCCC'), '1-800-JEF-FNOW');
assert.equal(nanp.formatPhone('1-800-JEFF-NOW', 'I-AAA-BBB-CCCC', {decodeVanity: true}), '1-800-533-3669');
assert.equal(nanp.formatPhone('1-800-533-3669', 'I-AAA-BBB-CCCC', {decodeVanity: false}), '1-800-533-3669');

assert.equal(nanp.formatPhone('(732) 291-9635', 'AAA-BBB-CCCC'), '732-291-9635');
assert.equal(nanp.formatPhone('(732) 291.9635', '(AAA) BBB-CCCC'), '(732) 291-9635');

assert.equal(nanp.formatPhone('(732) 291-9635', 'aaa-bbb-cccc'), '732-291-9635');
assert.equal(nanp.formatPhone('(732) 291.9635', '(aaa) bbb-cccc'), '(732) 291-9635');
assert.equal(nanp.formatPhone('(732) 291 9635', 'aaa-bbb-cccc'), '732-291-9635');
assert.equal(nanp.formatPhone('732 291 9635', 'aaa-bbb-cccc'), '732-291-9635');
assert.equal(nanp.formatPhone('732.291.9635', 'i-aaa-bbb-cccc'), '1-732-291-9635');
assert.equal(nanp.formatPhone('1.732.291.9635', 'aaa-bbb-cccc'), '732-291-9635');
assert.equal(nanp.formatPhone('+1.732.291.9635', 'aaa-bbb-cccc'), '732-291-9635');
assert.equal(nanp.formatPhone('1-732-291-9635', 'aaa-bbb-cccc'), '732-291-9635');
assert.equal(nanp.formatPhone('732-291-9635', '+1.aaa.bbb.cccc'), '+1.732.291.9635');
assert.equal(nanp.formatPhone('1-732-291-9635', 'aaa-bbb-cccc'), '732-291-9635');
assert.equal(nanp.formatPhone('+1-732-291-9635', 'aaa-bbb-cccc'), '732-291-9635');
assert.equal(nanp.formatPhone('1 732 291 9635', 'aaa-bbb-cccc'), '732-291-9635');

assert.equal(nanp.decodeVanity('800-JEFF-NOW'), '800-533-3669');
assert.equal(nanp.decodeVanity('800-jeff-now'), '800-533-3669');
assert.equal(nanp.decodeVanity('1-800-JEFF-NOW', 'i-aaa-bbb-cccc'), '1-800-533-3669');
assert.equal(nanp.decodeVanity('1-800-jeff-now', 'i-aaa-bbb-cccc'), '1-800-533-3669');
assert.equal(nanp.decodeVanity('1-800-JEFF-NOW', '1-aaa-bbb-cccc'), '1-800-533-3669');
assert.equal(nanp.decodeVanity('1-800-jeff-now', '1-aaa-bbb-cccc'), '1-800-533-3669');

