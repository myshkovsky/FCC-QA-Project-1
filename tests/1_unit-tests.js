const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite('convertHandler.getNum(input)', function() {
    test('convertHandler should correctly read a whole number input.', function(done) {
      assert.equal(convertHandler.getNum("25mi"), 25);
      done();
    });
    test('convertHandler should correctly read a decimal number input.', function(done) {
      assert.equal(convertHandler.getNum("10.24L"), 10.24);
      done();
    });
    test('convertHandler should correctly read a fractional input.', function(done) {
      assert.equal(convertHandler.getNum("6/4gal"), 1.5);
      done();
    });
    test('convertHandler should correctly read a fractional input with a decimal.', function(done) {
      assert.equal(convertHandler.getNum("18/4.5"), 4);
      done();
    });
    test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', function(done) {
      assert.equal(convertHandler.getNum("9/3/3"), 'invalid number');
      done();
    });
    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', function(done) {
      assert.equal(convertHandler.getNum("mi"), 1);
      assert.equal(convertHandler.getUnit("mi"), 'mi');
      done();
    });
  });
  suite('convertHandler.getUnit(input)', function() {
    test('convertHandler should correctly read each valid input unit.', function(done) {
      let units = ['kg', 'km', 'L', 'lbs', 'mi', 'gal'];
      units.forEach((unit) => {
        assert.equal(convertHandler.getUnit(10+unit), unit);
      });
      done();
    });
    test('convertHandler should correctly return an error for an invalid input unit.', function(done) {
      assert.equal(convertHandler.getUnit("32hz"), 'invalid unit');
      done();
    });
  });
  suite('convertHandler.getReturnUnit(initUnit)', function() {
    test('convertHandler should return the correct return unit for each valid input unit.', function(done) {
      let units = ['kg', 'km', 'L', 'lbs', 'mi', 'gal'];
      let expected = ['lbs', 'mi', 'gal', 'kg', 'km', 'L'];
      units.forEach((unit, i) => {
        assert.equal(convertHandler.getReturnUnit(unit), expected[i]);
      });
      done();
    });
  });
  suite('converterHandler.spellOutUnit(unit)', function() {
    test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', function(done) {
      let units = ['kg', 'km', 'L', 'lbs', 'mi', 'gal'];
      let expected = ['kilograms', 'kilometers', 'liters', 'pounds', 'miles', 'gallons'];
      units.forEach((unit, i) => {
        assert.equal(convertHandler.spellOutUnit(unit), expected[i]);
      });
      done();
    });
  });
  suite('converterHandler.convert(initNum, initUnit)', function() {
    test('convertHandler should correctly convert gal to L.', function(done) {
      assert.equal(convertHandler.convert(1, "gal"), 3.78541);
      done();
    });
    test('convertHandler should correctly convert L to gal.', function(done) {
      assert.equal(convertHandler.convert(1, "l"), 0.26417);
      done();
    });
    test('convertHandler should correctly convert mi to km.', function(done) {
      assert.equal(convertHandler.convert(1, "mi"), 1.60934);
      done();
    });
    test('convertHandler should correctly convert km to mi.', function(done) {
      assert.equal(convertHandler.convert(1, "km"), 0.62137);
      done();
    });
    test('convertHandler should correctly convert lbs to kg.', function(done) {
      assert.equal(convertHandler.convert(1, "lbs"), 0.45359);
      done();
    });
    test('convertHandler should correctly convert kg to lbs.', function(done) {
      assert.equal(convertHandler.convert(1, "kg"), 2.20462);
      done();
    });
  });
});
