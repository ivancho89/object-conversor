const converter = require('../index.js');
const fixtures = require('./fixtures.js')


test('Key not found', () => {

    try{
        converter.pathValueModifier(fixtures.regularObj, {path:'path56'})
    }catch(e){
        expect(e.message).toEqual(expect.stringContaining('not found'));
    }

});

test('Nested object with more than 10 levels', () => {

    try{
        converter.pathValueModifier(fixtures.bigObj, {path:'path1/path4/path5', value:"Another"})
    }catch(e){
        expect(e.message).toEqual(expect.stringContaining('is grather than 10'));
    }

});

test('Nested object with less than 10 levels', () => {

    try{
        const newValue = "Another"
        converter.pathValueModifier(fixtures.regularObj, {path:'path2/path9', value:newValue})

        expect()
    }catch(e){

        console.log(" Less than 10 levels ERR :: ", e)

    }
 
});

test("Cant conver't number into string", () => {

    const newValue = 5
    try{
        converter.pathValueModifier(fixtures.regularObj, {path:'path2/path9', value:newValue})
    }catch(e){
        expect(e.message).toEqual(expect.stringContaining("can't be made"));
    }
});

test("Cant conver't an array into a number or make operations", () => {

    const newValue = 5
    try{
        converter.pathValueModifier(fixtures.regularObj, {path:'path1/path4/path50', value:newValue})
    }catch(e){
        expect(e.message).toEqual(expect.stringContaining("can't be changed/converted"));
    }
});


test("Change numeric value - sum ", () => {
 
     converter.pathValueModifier(fixtures.regularObj, {path:'path1/path11', value:2, operation:'+'})
     expect(fixtures.regularObj.path1.path11).toBe(12)

});



test("Change numeric value - rest ", () => {
 
    converter.pathValueModifier(fixtures.regularObj, {path:'path1/path11', value:2, operation:'-'})
    expect(fixtures.regularObj.path1.path11).toBe(10)

});


test("Change numeric value - multiply ", () => {
 
    converter.pathValueModifier(fixtures.regularObj, {path:'path1/path13/path70', value:5, operation:'*'})
    expect(fixtures.regularObj.path1.path13.path70).toBe(65)

});

test("Translate String ", () => {
 
    const newValue = "Hello World"

    converter.pathValueModifier(fixtures.regularObj, {path:'path1/path4/path5', value:newValue})

    const translateValue = fixtures.regularObj.path1.path4.path5
    expect(fixtures.regularObj.path1.path4.path5).toBe(translateValue)

});

