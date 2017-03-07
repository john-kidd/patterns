package common

import scala.collection.mutable.ListBuffer

object Pipeline {
  def runAll[TData](data: TData, funcs: ((TData) => Result[TData])*): Result[TData] = {
    val errors = new ListBuffer[String]()
    var x = data
    funcs.foreach(f => {
      val result = f(x)
      if (!result.success())
        errors += result.error
      x = result.data
    })
    Result(errors.toList.mkString("<br/>"), x)
  }

  def runUntilFirstFault[TData](data: TData, funcs: ((TData) => Result[TData])*): Result[TData] = {
    funcs.foreach(f => {
      val result = f(data)
      if (!result.success())
        Result(result.error, data)
    })
    Result("", data)
  }
}
