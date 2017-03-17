package fund.shared

import fund.common.StringExtensions._

// INFO: This is an example of extending a built in object so that we can easily access fund.common.shared business logic.
object StringExtensions {
  private val emailRegEx = """^[^@]+@[^@]+\.[^@]+$""".r

  implicit class StringLogic(val s: String) {
    def isValidEmailAddress = s == !s.isNullOrEmpty || emailRegEx.findFirstMatchIn(s).isDefined
  }

}
