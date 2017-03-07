package common

case class Result[TData](error: String = "", data: TData = None) {
  def success() = error == ""
}
