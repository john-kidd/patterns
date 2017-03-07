package common

import scala.collection.mutable.ListBuffer

object Pipeline {
  case class Result[TData](error: String = "", data: TData = None) {
    def success() = error == ""
  }

  def runAll[TData](data: TData, funcs: ((TData) => Result[TData])*): Result[TData] = {
    val errors = new ListBuffer[String]()
    var currentData = data
    funcs.foreach(f => {
      val result = f(currentData)
      if (!result.success())
        errors += result.error
      currentData = result.data
    })
    Result(errors.toList.mkString("<br/>"), currentData)
  }

  def runUntilFirstFault[TData](data: TData, funcs: ((TData) => Result[TData])*): Result[TData] = {
    var result: Result[TData] = null
    funcs.foreach(f => {
      result = f(data)
      if (!result.success())
        return Result(result.error, result.data)
    })
    Result(data = result.data)
  }
}
