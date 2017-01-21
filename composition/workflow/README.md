# workflow

Workflow provided a pattern for chaining functions together. The pattern
offers 3 variations:

1. runAll
takes a set of functions and runs all returning a result with any errors

2. runUntilFirstFault
takes a set of functions and runs until the first function errors, it 
then returns the error (circuit-break)

3. runN
takes a set of functions and runs until the n functions errors, it 
then returns the errors (circuit-break)
