import common.Pipeline._
import DomainModel._
import org.scalatest.FunSpec

class PipelineRunUntilFirstFaultTests extends FunSpec {

  val NAME_STUB = "John Kidd"
  val EMAIL_ADDRESS_STUB = "john@test.com"

  describe("Pipeline") {
     describe("runUntilFirstFault") {
      it("should return that we have no errors") {
        // arrange
        val personStub = Person(NAME_STUB, EMAIL_ADDRESS_STUB)
        val expected = ""

        // act
        val result = runUntilFirstFault(personStub, validateName, validateEmailAddress)
        val actual = result.error

        // assert
        assert(expected == actual)
      }

      it("should return that we have an invalid name") {
        // arrange
        val personStub = Person(emailAddress = EMAIL_ADDRESS_STUB)
        val expected = INVALID_NAME_MESSAGE

        // act
        val result = runUntilFirstFault(personStub, validateName, validateEmailAddress, updateName(NAME_STUB), updateEmailAddress(EMAIL_ADDRESS_STUB))
        val actual = result.error

        // assert
        assert(expected == actual)
      }

      it("should return that we the email address has an incorrect format") {
        // arrange
        val personStub = Person(name = NAME_STUB)
        val expected = EMAIL_ADDRESS_FORMAT_IS_INCORRECT_MESSAGE

        // act
        val result = runUntilFirstFault(personStub, validateName, validateEmailAddress, updateName(NAME_STUB), updateEmailAddress(EMAIL_ADDRESS_STUB))
        val actual = result.error

        // assert
        assert(expected == actual)
      }

      it("should return that we have an invalid name and break") {
        // arrange
        val personStub = Person()
        val expected = INVALID_NAME_MESSAGE

        // act
        val result = runUntilFirstFault(personStub, validateName, validateEmailAddress, updateName(NAME_STUB), updateEmailAddress(EMAIL_ADDRESS_STUB))
        val actual = result.error

        // assert
        assert(expected == actual)
      }
    }
  }
}
