package common

// This is an example of a helper method extending a built in object. There is no business context here.
object StringExtensions {
  implicit class StringUtils(val s: String) {
    def isNullOrEmpty = s == null || s.trim.isEmpty
  }

}
