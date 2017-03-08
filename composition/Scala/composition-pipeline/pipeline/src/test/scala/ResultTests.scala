import DomainModel.Person
import common.Pipeline.Result
import org.scalatest.FunSpec

class ResultTests extends FunSpec {
  val NAME_STUB = "John Kidd"
  val EMAIL_ADDRESS_STUB = "jk@test.com"

  def updateEmailAddress(person: Person): Result[Person] = {
    return Result(data = Person(person.name, EMAIL_ADDRESS_STUB))
  }

  describe("Request") {
    it("should return error message when error provided") {
      // arrange
      val errorStub = "an error"
      val target = Result(errorStub)

      // act
      val actual = target.error

      // assert
      assert(errorStub == actual)
    }

    it ("should return the data") {
      // arrange
      val personStub = Person(name = NAME_STUB)

      // act
      val target = new Result(data = personStub)
      val actual = target.data

      // assert
      assert(personStub == actual)
    }

    it ("should return an updated clone of the data") {
      // arrange
      val personStub = Person(name = NAME_STUB)

      // act
      val actual = updateEmailAddress(personStub).data

      // assert
      assert(personStub != actual)
    }

    it ("should return an clone of the data with additional field") {
      // arrange
      val personStub = Person(name = NAME_STUB)
      val expected = EMAIL_ADDRESS_STUB

      // act
      val actual = updateEmailAddress(personStub).data.emailAddress

      // assert
      assert(expected == actual)
    }
  }
}
