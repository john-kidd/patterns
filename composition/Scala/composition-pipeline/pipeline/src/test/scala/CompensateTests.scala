import DomainModel._
import common.Pipeline._
import org.scalatest.FunSpec

class CompensateTests extends FunSpec {
  describe("Compensate") {
    it("publishUpdate should compensate on error") {
      // arrange
      var compensated = false
      val logInfoStub = (message: String) => {
        println(message)
        compensated = true
      }
      val personStub = Person("Person A", "personA@test.com")
      val funcs = List[((Person) => Result[Person])](validateName, publishUpdate(personStub, logInfoStub))

      // act
      runAll(personStub, funcs)

      // assert
      assert(compensated)
    }
  }
}