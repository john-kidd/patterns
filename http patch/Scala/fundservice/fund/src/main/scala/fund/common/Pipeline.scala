package fund.common

import scala.collection.mutable.ListBuffer

object Pipeline {
  case class Result[TData](error: String = "", data: TData = None, compensate: (() => Unit) = null) {
    def success() = error == ""
    def shouldCompensate() = compensate != null
  }

  def runAll[TData](data: TData, funcs: List[((TData) => Result[TData])]): Result[TData] = {
    val errors = new ListBuffer[String]()
    val compensators = new ListBuffer[(() => Unit)]()
    var currentData = data
    funcs.foreach(f => {
      val result = f(currentData)
      if (!result.success())
        errors += result.error
      currentData = result.data
      if (result.shouldCompensate())
        compensators += result.compensate;
    })
    compensators.foreach(c => c())
    Result(errors.toList.mkString("<br/>"), currentData)
  }

  def runUntilFirstFault[TData](data: TData, funcs: List[((TData) => Result[TData])]): Result[TData] = {
    var result: Result[TData] = null
    val compensators = new ListBuffer[(() => Unit)]()
    var currentData = data
    funcs.foreach(f => {
      result = f(currentData)
      if (!result.success())
        return result
      if (result.shouldCompensate())
        compensators += result.compensate;
      currentData = result.data
    })
    compensators.foreach(c => c())
    Result(data = currentData)
  }
}
