/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  @Desc: Run all tests
*
*  Copyright (c) 2016. University of Colorado, boulder
*/
var assert = require('assert')
 
exports['test that stops execution on first failure'] = function() {
  assert.equal(2 + 3, 5, 'assert fails and test execution stop here')
  assert.equal(3 + 2, 5, 'will never pass this since test failed above')
}
 
if (module == require.main)
    require('test').run(exports)