# Path-Value-Modifier

Converts the values of the properties of an arbitrary object to another language/unit

---

- #### Node installation 

You can install nodejs and npm easily with npm install, just run the following commands.

    $ npm install path-value-modifier


## Use

You can use the librari with a basic rqueire in your file

    const converter = require('path-value-modifier');

from there you can use the methods *pathValueModifier* to convert a property you need and also if you need to see the performance in the console you can use the method *showPerformance*.

The objectConverter has two params:

    1. the object you want to modify
    2. the consiguration object you want to use
        a) path : the path separate by / , i.e "path1/path2/path3"
        b) value : the value you want to conver to 
        c) operation (optional): if the field you want to convert is a numberic field you can send the operation you want to perform ('+', '-',  '*' or  '/')
        d) language (optional): for the strings if you want to perform any kind of translation you can send the language you want to tranlaste to

