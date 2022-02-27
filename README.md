# catch-exception-input

# Usage

1.  Add ExceptionDataEntity to your TypeOrm connection
2.  Use WrapFunctions function to wrap function of object into functions that catch exceptions

        const obj = new SomeClass()
        WrapFunctions(obj)

    OR

         class SomeClass {
             constructor() {
                 WrapFunctions(this)
             }
         }

# Content of ExceptionDataEntity

1. Class name
2. Function name
3. Create date
4. Function input parameters
5. Stack (Content of error)
