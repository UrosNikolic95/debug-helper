import { WrapFunctions } from "./wrapper";

class A {
  func1(a: unknown, b: unknown, c: unknown, d: unknown) {
    console.log("func1", a, b, c, d);
    if (a == 0) {
      throw new Error();
    }
  }
}

class B extends A {
  func2(a: unknown, b: unknown) {
    console.log("func2", a, b);
  }
}

const obj = new B();
WrapFunctions(obj);

obj.func1(0, 2, 3, 4);
obj.func2(1, 2);
