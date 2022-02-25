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

export function WrapSingleFunction(func: Function): Function {
  return (...args: any[]) => {
    try {
      return func(...args);
    } catch (err) {
      console.log(err);
    }
  };
}

export function WrapFunctions(obj: any): void {
  const functionNames = GetAllFunctionNames(obj);
  functionNames.forEach((funcName) => {
    const func: Function = obj[funcName];
    func.bind(obj);
    obj[funcName] = WrapSingleFunction(obj[funcName]);
  });
}
