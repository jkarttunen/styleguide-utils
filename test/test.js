var assert = require('assert');
var sgUtils = require('../src/index.js');

var sg = {
  foo: 'bar',
  sections: [
   {
     header: 'Component',
     reference: '1.1',
     parentReference: '1',
     foo: 'bar'
   },
   {
    header: 'Components',
    reference: '1'
   }
  ]
};

describe('sgUtils', function() {
  it('exists', function() {
    assert(sgUtils);
  });

  describe('.getDepth', function() {
    it('counts depth from reference', function() {
      assert.equal(sgUtils.getDepth('foo'), 0);
      assert.equal(sgUtils.getDepth('1'), 0);
      assert.equal(sgUtils.getDepth('foo.bar'), 1);
      assert.equal(sgUtils.getDepth('1.2'), 1);
      assert.equal(sgUtils.getDepth('1.2.3'), 2);
    });
  });


  describe('.sgNavigation', function() {
    it('Picks navigation only from styleguide', function() {
      var navigation = sgUtils.sgNavigation(sg)
      assert.equal(navigation.foo, undefined);
      assert.equal(navigation.sections[0].header, 'Component');
      assert.equal(navigation.sections[0].reference, '1.1');
      assert.equal(navigation.sections[0].parentReference, '1');
      assert.equal(navigation.sections[0].depth, 1);
      assert.equal(navigation.sections[0].foo, undefined);

      assert.equal(navigation.sections[1].header, 'Components');
      assert.equal(navigation.sections[1].reference, '1');
      assert.equal(navigation.sections[1].parentReference, undefined);
      assert.equal(navigation.sections[1].depth, 0);
    });
  });

  describe('.sgNavigationTree', function() {
    it('Picks navigation tree only from styleguide', function() {
      var navigation = sgUtils.sgNavigationTree(sg)
      assert.equal(navigation.foo, undefined);
      assert.equal(navigation.sections[0].header, 'Components');
      assert.equal(navigation.sections[0].reference, '1');
      assert.equal(navigation.sections[0].parentReference, undefined);
      assert.equal(navigation.sections[0].depth, 0);
      assert.equal(navigation.sections[0].subItems[0].header, 'Component');
      assert.equal(navigation.sections[0].subItems[0].reference, '1.1');
      assert.equal(navigation.sections[0].subItems[0].parentReference, '1');
      assert.equal(navigation.sections[0].subItems[0].depth, 1);
      assert.equal(navigation.sections[0].subItems[0].foo, undefined);
    });
  });
});
