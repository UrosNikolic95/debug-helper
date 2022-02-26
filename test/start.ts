import "reflect-metadata";
import { WrapFunctions } from "../src/main";
import { TestingHelper } from "../prepare-test";

function sleep(milliseconds: number): Promise<void> {
  return new Promise((res) => setTimeout(res, milliseconds));
}

test("Test 1", async () => {
  await TestingHelper.getConnection();
  class A {
    field1 = 1;

    func1(a: unknown, b: unknown, c: unknown, d: unknown) {
      console.log("func1", a, b, c, d);
      if (a == 0) {
        throw new Error("THIS EXCEPTION SHOULD HAPPEN");
      }
    }
  }

  class B extends A {
    field2 = 2;

    func2(a: unknown, b: unknown) {
      console.log("func2", a, b);
      return {
        field1: this.field1,
        field2: this.field2,
      };
    }
  }

  const obj = new B();
  WrapFunctions(obj);

  obj.func1(0, 2, 3, 45);
  console.log("field: ", obj.func2(1, 2));
  await sleep(5000); // racing condition fix
  await TestingHelper.close();
}, 10000);
