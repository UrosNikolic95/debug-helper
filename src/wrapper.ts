import { getRepository } from "typeorm";
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
  return (...args: any[]) => {
    try {
      return func(...args);
    } catch (err1) {
      console.log(err1);
      MemorizeParamaters(class_name, function_name, args);
    }
  };
}

export function WrapFunctions(obj: object): void {
  const functionNames = GetAllFunctionNames(obj);
  functionNames.forEach((funcName) => {
    const func: Function = obj[funcName];
    func.bind(obj);
    const className = Object.getPrototypeOf(obj).constructor.name;
    obj[funcName] = WrapSingleFunction(obj[funcName], className, funcName);
  });
}
