'use restrict'

var OBJ_HEIGHT = 0;

/**
 * Calculate the height of the nested objects, after complete the whole object asign the final value to OBJ_HEIGHT
 * @param {Object} obj original nested object
 * @param {Number} counter keep track of the levels
 * @returns Number
 */
const calcObjHeight = (obj ={}, counter = 0)=>{
    const objKeys = Object.keys(obj)
    objKeys.forEach((key, index)=>{

        if(typeof obj[key] === "object" && Object.keys(obj[key]).length > 0){
            counter =  calcObjHeight(obj[key], counter+1)
        }else if(!objKeys[index+1]){  
            OBJ_HEIGHT = counter > OBJ_HEIGHT ? counter : OBJ_HEIGHT;
            counter = 0
        }
    })
    return counter
}


const translateStr = (srt = "") =>{

    return srt

}
/**
 * Convert the given value for a key acorrding the type
 * @param {Object} obj  Original object
 * @param {String} key  Key in the object
 * @param {*} value The value to convert
 * @param {String} [operation] the operation to make if the value and key are numbers
 */
const convertValue =  (obj, key, value, operation = '*')=>{

    const allowedConvertionTypes = ['string', 'number']
    if(obj[key]){

        const keyType =  typeof obj[key]
        const valueType = typeof value

        if( allowedConvertionTypes.includes(keyType) ){

            const hasSameType = keyType === valueType
            if(hasSameType && keyType === 'string'){

                obj[key] =  value
            }else if(hasSameType && keyType === 'number'){

                switch(operation){

                    case '+':
                        obj[key] = obj[key] + value
                    break;
                    case '-':
                        obj[key] = obj[key] - value
                    break;
                    case '*':
                        obj[key] = obj[key] * value
                    break
                    case '/':
                        if(value <= 0){
                            throw new Error(`The division by ${value}(${valueType}) in the key: ${key}(${keyType}) can't be performed, pleasee review and try again`)
                        }else{
                            obj[key] = obj[key] / value
                        }
                    break;
                    default:
                        obj[key] = value
                    break
                }
            }else{
                throw new Error(`The converstion for the value: ${value}(${valueType}) int the key: ${key} with original value: ${obj[key]}(${keyType}) can't be made`)
            }
            
        }else{
            throw new Error(`The type/format of the key: ${key}(${keyType}), can't be changed/converted to ${value}(${valueType})`)
        }
    }else{
        throw new Error(` Key: ${key}, not found`)
    }

}

/**
 * Recursie function to access the nested object
 * @param {*} obj 
 * @param {*} config 
 */
const objectRecursiveIterator = (obj, config) =>{

    let { path, value, operation, language } = config
    
    let formattedPath =  Array.isArray(path) ? path : path.split("/");
    formattedPath.forEach( (key, index) => {

        const keyExistAndPathContinue = obj[key] && formattedPath.length > 1
        if(keyExistAndPathContinue){
            formattedPath.shift()
            config.path = formattedPath;
            objectRecursiveIterator(obj[key], config, value)
        }else{
            convertValue(obj, key, value, operation)
        }
    })
}

/**
 * Starte the process to converts the values of the properties of an arbitrary object to another language/unit
 * @param {Object} obj Original object
 * @param {Object} config configuration
 */
 const pathValueModifier = (obj = {}, config = {path : '', value : '', operation: '*', language: 'en'} ) => {

    OBJ_HEIGHT = 0
    calcObjHeight(obj)
    let { path, value} = config

    if(path === '' || value === ''){
        throw new Error(`Please provide a valid path and valid value`)
    }

    if(OBJ_HEIGHT > 10){
        throw new Error(`The nested level is grather than 10, please review and try again.`)
    }

    objectRecursiveIterator(obj, config)
}

const showPerformance = () => {
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
}

module.exports = {
    pathValueModifier,
    showPerformance
}
