# Path-Value-Modifier

Converts the values of the properties of an arbitrary object to another language/unit

---

- #### Node installation 

You can install nodejs and npm easily with npm install, just run the following commands.

    $ npm install path-value-modifier

You can also clone the repo `https://github.com/ivancho89/path-value-modifier` and tun the tests *npm test* 

## Use

You can use the librari with a basic rqueire in your file

    const converter = require('path-value-modifier');

from there you can use the methods *pathValueModifier* to convert a property you need and also if you need to see the performance in the console you can use the method *showBasicPerformance* or *showCompletePerformance* to get more information about the performance

The objectConverter has two params:

    1. the object you want to modify
    2. the consiguration object you want to use
        a) path : the path separate by / , i.e "path1/path2/path3"
        b) value : the value you want to conver to 
        c) operation (optional): if the field you want to convert is a numberic field you can send the operation you want to perform ('+', '-',  '*' or  '/')
        d) language (optional): for the strings if you want to perform any kind of translation you can send the language you want to tranlaste to

## Example

Crate a inde.js file and import the *path-value-modifier*


    const converter = require('path-value-modifier');

Then you can create or use a nested object, here is a basic example:

    var regularObj = {

        "path1":{
            "path4":{
                "path5": "This is level 2 - path 5",
                "path20":{
                    "path21":23
                },
                "path50":[]
            },
        },
        "path2":{
            "path6":{
                "path7": {
                    "path8": "This is level 3 - path 8",
                    "path30":{
                        "path31":"This is level 4 - path 31"
                    }
                }
            },
            "path9": "test",
            "path10": 5
        },
        "path3": "This is level 1 - path 3",
        "path5": "This is level 1 - path 5"
    }


As you can see there are multiple levels, you can use the *pathValueModifier* to change the value of a key

    converter.pathValueModifier(regularObj, {path:"path1/path4/path5", value:"Hello World"})

if you log the object you will be able to see how the key change 
    
    console.log(regularObj)

    {
        path1: { path4: { path5: 'Hello World', path20: [Object], path50: [] } },
        path2: { path6: { path7: [Object] }, path9: 'test', path10: 5 },
        path3: 'This is level 1 - path 3',
        path5: 'This is level 1 - path 5'
    }

## Example - Performance

You can test the same example before but now after run the *pathValueModifier* you can run the *showBasicPerformance* to get data about the performance of the library.

    The script uses approximately 2.35 MB

or something more specific (using *showCompletePerformance* method)

    rss 25.63 MB
    heapTotal 5.49 MB
    heapUsed 3.6 MB
    external 0.01 MB

## To improve 

- Create `translateStr` function to translate strings to an specific language
- Review logic, optimice the recursive methods