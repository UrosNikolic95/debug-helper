"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrapFunctions = exports.WrapSingleFunction = exports.GetAllFunctionNames = void 0;
function GetAllFunctionNames(obj) {
    const funcNames = [];
    let current = obj;
    while (current) {
        funcNames.push(...Object.getOwnPropertyNames(current));
        current = Object.getPrototypeOf(current);
    }
    return removeDuplicates(funcNames).filter((key) => typeof obj[key] == "function");
}
exports.GetAllFunctionNames = GetAllFunctionNames;
function removeDuplicates(funcNames) {
    return Array.from(new Set(funcNames));
}
function WrapSingleFunction(func) {
    return (...args) => {
        try {
            return func(...args);
        }
        catch (err) {
            console.log(err);
        }
    };
}
exports.WrapSingleFunction = WrapSingleFunction;
function WrapFunctions(obj) {
    const functionNames = GetAllFunctionNames(obj);
    functionNames.forEach((funcName) => {
        const func = obj[funcName];
        func.bind(obj);
        obj[funcName] = WrapSingleFunction(obj[funcName]);
    });
}
exports.WrapFunctions = WrapFunctions;
