import common.Pipeline.Result
import common.StringExtensions._
import shared.StringExtensions._

// INFO: An example of a domain model for an simple application. The idea is to provide sample methods that we can chain
//       together using the pipeline pattern.
object DomainModel {
  val INVALID_NAME_MESSAGE = "Invalid name"
  val EMAIL_ADDRESS_FORMAT_IS_INCORRECT_MESSAGE = "Email address format is incorrect"

  case class Person(name: String = "", emailAddress: String = "")

  def validateName(person: Person): Result[Person] = {
    person.name match {
      case name if name.isNullOrEmpty => Result(INVALID_NAME_MESSAGE, person)
      case _ => Result(data = person)
    }
  }

  def validateEmailAddress(person: Person): Result[Person] = {
    person.emailAddress match {
      case emailAddress if !emailAddress.isValidEmailAddress => Result(EMAIL_ADDRESS_FORMAT_IS_INCORRECT_MESSAGE, person)
      case _ => Result(data = person)
    }
  }

  def updateName(name: String) = {
    val apply = (data: Person) => {
      Result(data = Person(name, data.emailAddress))
    }: Result[Person]
    apply
  }

  def updateEmailAddress(emailAddress: String) = {
    val apply = (data: Person) => {
      Result(data = Person(data.name, emailAddress))
    }: Result[Person]
    apply
  }
}
