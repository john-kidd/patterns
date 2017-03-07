# pipeline

Pipeline provides a pattern for chaining functions together. 

The pattern offers 3 variations:

1. runAll
takes a set of functions and runs all returning a result with any errors.

2. runUntilFirstFault
takes a set of functions and runs until the first function errors, it 
then returns the error (circuit-break).

3. runN
takes a set of functions and runs until the n functions errors, it 
then returns the errors (circuit-break).

NOTE: The data is passed to each function - it will be returned as part of the result. 
The intention is that the data is immutable so the developer can use techniques from the unit tests
i.e (Object.assign(...). It is up to the developer to use this feature.
