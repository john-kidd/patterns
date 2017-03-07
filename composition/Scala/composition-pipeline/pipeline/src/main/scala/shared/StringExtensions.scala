package shared

import common.StringExtensions._

// This is an example of extending a built in object so that we can easily access shared business logic.
object StringExtensions {
  private val emailRegEx = """^[^@]+@[^@]+\.[^@]+$""".r

  implicit class StringLogic(val s: String) {
    def isValidEmailAddress = s == !s.isNullOrEmpty || emailRegEx.findFirstMatchIn(s).isDefined
  }

}
