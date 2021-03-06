import common.Pipeline._
import DomainModel._
import org.scalatest.FunSpec

class PipelineRunAllTests extends FunSpec {

  val NAME_STUB = "John Kidd"
  val EMAIL_ADDRESS_STUB = "john@test.com"

  describe("Pipeline") {
    describe("runAll") {
      it("should return that we have no errors") {
        // arrange
        val personStub = Person(NAME_STUB, EMAIL_ADDRESS_STUB)
        val expected = ""
        val funcs = List[((Person) => Result[Person])](DomainModel.validateName, validateEmailAddress)

        // act
        val result = runAll(personStub, funcs)
        val actual = result.error

        // assert
        assert(expected == actual)
      }

      it("should return that we have an invalid name") {
        // arrange
        val personStub = Person(emailAddress = EMAIL_ADDRESS_STUB)
        val expected = INVALID_NAME_MESSAGE
        val funcs = List[((Person) => Result[Person])](validateName, validateEmailAddress)

        // act
        val result = runAll(personStub, funcs)
        val actual = result.error

        // assert
        assert(expected == actual)
      }

      it("should return that email address cannot be blank") {
        // arrange
        val personStub = Person(name = NAME_STUB)
        val expected = EMAIL_ADDRESS_FORMAT_IS_INCORRECT_MESSAGE
        val funcs = List[((Person) => Result[Person])](validateName, validateEmailAddress)

        // act
        val result = runAll(personStub, funcs)
        val actual = result.error

        // assert
        assert(expected == actual)
      }

      it("should return that email address has an incorrect format") {
        // arrange
        val INCORRECTLY_FORMED_EMAIL_ADDRESS_STUB = "john.com"
        val personStub = Person(NAME_STUB, INCORRECTLY_FORMED_EMAIL_ADDRESS_STUB)
        val expected = EMAIL_ADDRESS_FORMAT_IS_INCORRECT_MESSAGE
        val funcs = List[((Person) => Result[Person])](validateName, validateEmailAddress)

        // act
        val result = runAll(personStub, funcs)
        val actual = result.error

        // assert
        assert(expected == actual)
      }

      it("should return that we have an invalid name and the email address has an incorrect format") {
        // arrange
        val personStub = Person()
        val expected = s"$INVALID_NAME_MESSAGE<br/>$EMAIL_ADDRESS_FORMAT_IS_INCORRECT_MESSAGE"
        val funcs = List[((Person) => Result[Person])](validateName, validateEmailAddress)

        // act
        val result = runAll(personStub, funcs)
        val actual = result.error

        // assert
        assert(expected == actual)
      }

      it("should return new data object with updated name") {
        // arrange
        val personStub = Person(NAME_STUB, EMAIL_ADDRESS_STUB)
        val NEW_NAME = "Jim Bob"
        val expected = NEW_NAME
        val funcs = List[((Person) => Result[Person])](validateName, validateEmailAddress, updateName(NEW_NAME))

        // act
        val result = runAll(personStub, funcs)
        val actual = result.data.name

        // assert
        assert(expected == actual)
      }

      it("should return new data object with updated email address") {
        // arrange
        val personStub = Person(name = NAME_STUB)
        val NEW_EMAIL_ADDRESS = "jim@test.com"
        val expected = NEW_EMAIL_ADDRESS
        val funcs = List[((Person) => Result[Person])](validateName, validateEmailAddress, updateEmailAddress(NEW_EMAIL_ADDRESS))

        // act
        val result = runAll(personStub, funcs)
        val actual = result.data.emailAddress

        // assert
        assert(expected == actual)
      }
    }

    describe("runUntilFirstFault") {
      it("should return that we have no errors") {
        // arrange
        val personStub = Person(NAME_STUB, EMAIL_ADDRESS_STUB)
        val expected = ""
        val funcs = List[((Person) => Result[Person])](validateName, validateEmailAddress)

        // act
        val result = runUntilFirstFault(personStub, funcs)
        val actual = result.error

        // assert
        assert(expected == actual)
      }

      it("should return that we have an invalid name") {
        // arrange
        val personStub = Person(emailAddress = EMAIL_ADDRESS_STUB)
        val expected = INVALID_NAME_MESSAGE
        val funcs = List[((Person) => Result[Person])](validateName, validateEmailAddress, updateName(NAME_STUB), updateEmailAddress(EMAIL_ADDRESS_STUB))

        // act
        val result = runUntilFirstFault(personStub, funcs)
        val actual = result.error

        // assert
        assert(expected == actual)
      }

      it("should return that we the email address has an incorrect format") {
        // arrange
        val personStub = Person(name = NAME_STUB)
        val expected = EMAIL_ADDRESS_FORMAT_IS_INCORRECT_MESSAGE
        val funcs = List[((Person) => Result[Person])](validateName, validateEmailAddress, updateName(NAME_STUB), updateEmailAddress(EMAIL_ADDRESS_STUB))

        // act
        val result = runUntilFirstFault(personStub, funcs)
        val actual = result.error

        // assert
        assert(expected == actual)
      }

      it("should return that we have an invalid name and break") {
        // arrange
        val personStub = Person()
        val expected = INVALID_NAME_MESSAGE
        val funcs = List[((Person) => Result[Person])](validateName, validateEmailAddress, updateName(NAME_STUB), updateEmailAddress(EMAIL_ADDRESS_STUB))

        // act
        val result = runUntilFirstFault(personStub, funcs)
        val actual = result.error

        // assert
        assert(expected == actual)
      }
    }
  }
}
