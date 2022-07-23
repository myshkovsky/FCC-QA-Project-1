function ConvertHandler() {

  let globalRegex = /[a-z]+|[^a-z]+/gi;

  this.getNum = function(input) {
    let result = input.match(globalRegex)[0];
    if(!/\d/.test(result)) result = 1;
    if(result.toString().includes('/')) {
      let nums = result.toString().split('/');
      if(nums.length != 2) return 'invalid number';
      nums.forEach((item) => {
        item = parseFloat(item);
      });
      result = parseFloat(nums[0]/nums[1]);
    }
    if(isNaN(result)) return 'invalid number';
    return result;
  };

  this.getUnit = function(input) {
    let result = input.match(globalRegex)[1]
    if (!result) result = input.match(globalRegex)[0];
    let acceptedUnits = ['kg', 'KG', 'km', 'KM', 'lbs', 'LBS', 'mi', 'MI', 'gal', 'GAL'];
    if (result == 'l' || result == 'L') return result.toUpperCase(); // Makes liters always return a capital L
    if (acceptedUnits.includes(result)) return result.toLowerCase(); else return 'invalid unit';
  };

  this.getReturnUnit = function(initUnit) {
    if (initUnit == 'lbs' || initUnit == 'LBS') return 'kg'; else if (initUnit == 'kg' || initUnit == 'KG') return 'lbs';
    if (initUnit == 'mi' || initUnit == 'MI') return 'km'; else if (initUnit == 'km' || initUnit == 'KM') return 'mi';
    if (initUnit == 'gal' || initUnit == 'GAL') return 'L'; else if (initUnit == 'l' || initUnit == 'L') return 'gal';
  };

  this.spellOutUnit = function(unit) {
    if (unit == "lbs") return 'pounds';
    if (unit == "mi") return 'miles';
    if (unit == "gal") return 'gallons';
    if (unit == "kg") return 'kilograms';
    if (unit == "km") return 'kilometers';
    if (unit == "L") return 'liters';
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch(initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'L':
      case 'l':
        result = initNum / galToL;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
    }
    return Math.round(parseFloat(result) * 1e5) / 1e5;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return initNum + " " + this.spellOutUnit(initUnit) + " converts to " + returnNum + " " + this.spellOutUnit(returnUnit);
  };

}

module.exports = ConvertHandler;
