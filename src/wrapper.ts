import { ExceptionDataEntity } from "./exception-data.entity";

export function GetAllFunctionNames(obj: any): string[] {
  const funcNames: string[] = [];
  let current = obj;
  while (current) {
    funcNames.push(...Object.getOwnPropertyNames(current));
    current = Object.getPrototypeOf(current);
  }
  return removeDuplicates(funcNames).filter(
    (key) => typeof obj[key] == "function"
  );
}

export function isSubset<T>(arrA: T[], arrB: T[]): boolean {
  const setB = new Set(arrB);
  return arrA.every((el) => setB.has(el));
}

export function setEquals<T>(arrA: T[], arrB: T[]): boolean {
  return isSubset(arrA, arrB) && arrA.length == arrB.length;
}

function removeDuplicates(funcNames: string[]): string[] {
  return Array.from(new Set(funcNames));
}

export async function MemorizeParamaters(
  class_name: string,
  function_name: string,
  args: any
) {
  try {
    console.log("MemorizeParamaters", {
      class_name,
      function_name,
      input_paramaters: args as unknown,
    } as ExceptionDataEntity);
    await ExceptionDataEntity.save({
      class_name,
      function_name,
      input_paramaters: args as unknown,
    } as ExceptionDataEntity);
  } catch (err2) {
    console.log("MemorizeParamaters Error:", err2);
  }
}

export function WrapSingleFunction(
  func: Function,
  class_name: string,
  function_name: string
): Function {
  const nameFunction = {
    [function_name](...args: any[]) {
      try {
        return func(...args);
      } catch (err1) {
        console.log(err1);
        MemorizeParamaters(class_name, function_name, args);
      }
    },
  }[function_name]; // this is making named function in order to preserve function names
  return nameFunction;
}

function subtractSet<T>(positive: T[], negative: T[]): T[] {
  const negativeSet = new Set(negative);
  return positive.filter((el) => !negativeSet.has(el));
}

export function getFunctionsWithoutPlainObjectFunctions(obj: object): string[] {
  return subtractSet(GetAllFunctionNames(obj), GetAllFunctionNames({}));
}

export function WrapFunctions(obj: object): void {
  const functionNames = GetAllFunctionNames(obj);
  functionNames.forEach((funcName) => {
    const func: Function = obj[funcName];
    const binedFunc = func.bind(obj);
    const className = obj.constructor.name;
    if (funcName != "constructor")
      obj[funcName] = WrapSingleFunction(binedFunc, className, funcName);
  });
}
