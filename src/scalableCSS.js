var postcss = require('postcss');
var units = require('parse-css-dimension');
var valueParser = require('postcss-value-parser');


class calculate {

    constructor(cssUnitObj,ratio){
        this.unit = cssUnitObj.unit;
        this.type = cssUnitObj.type;
        this.value = cssUnitObj.value;
        this.ratio = ratio;
    }


    calculate(){
        
        let newSize = {
            value:this.calcRatio(),
            unit: this.unit
        }

        return newSize;
    }

    calcRatio(){
        return ((this.value * this.ratio) / 100);
    }

    
}

module.exports = postcss.plugin('postcss-scalablecss', function (opts) {
    opts = opts || { percent: 100 };

    // apply on these declares.
    changesDeclares = opts.declares || ['min-height','min-width','left','top','width','height','margin', 'padding', 'font-size', 'line-height', 'transform'];

    tempVariable = [];

    return function (root, result) {

        root.walkRules(function (rule) {
            rule.walkDecls(function (declare) {
                console.log('========== ENTER Walk Decls ==========');

                if (changesDeclares.includes(declare.prop)) {
                    console.log('--- Start: ' + declare.prop + '---')
                    value = declare.value;
                    decValueParser = valueParser(value);
                    valueParser.walk(decValueParser.nodes,(element,index,nodes) => {                        
                        switch (element.type) {
                            case 'word':
                                if (!isNaN(parseFloat(element.value))) {

                                    valueUnits = new units.CssDimension(element.value);

                                    calculateObject = new calculate(valueUnits,opts.percent);
                                    newSize = calculateObject.calculate();
                                    newSizeValue = newSize.unit ? newSize.value+newSize.unit : newSize.value;

                                    if(index == 0 && nodes.length > 1){
                                        tempVariable = [];
                                        tempVariable.push(newSizeValue);
                                    }else if(index > 0){
                                        tempVariable.push(newSizeValue);
                                    }else{
                                        declare.value = newSizeValue;
                                    }

                                } else {
                                    console.error('[!] Error: (' + declare.prop + ') has value:(' + value + '), and (' + element.value + ') Not a number.');
                                }
                                
                                break;
                            case 'function':
                                // Todo
                                break;
                            case 'space':
                            break;
                            default:
                                console.error('[!] Error: (' + declare.prop + ') has value:(' + value + '), and (' + element.value + ') Not valid.');
                                break;
                        }
                    });
                    if(tempVariable.length > 0){
                        declare.value = tempVariable.join(' ');
                        tempVariable = [];
                    }
                    console.log('--- Close: ' + declare.prop + '---')
                }
                console.log('========== Exit Walk Decls ==========')
            });
        });
    };
});
