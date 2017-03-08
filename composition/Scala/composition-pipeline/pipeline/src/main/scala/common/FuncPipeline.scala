package common

import common.ActionPipeline.Result

import scala.collection.mutable.ListBuffer

object FuncPipeline {
  def runAll[TIn, TOut](input: TIn, funcs: ((TIn) => Result[TOut])*): Result[TOut] = {
    var result: Result[TOut] = null
    val errors = new ListBuffer[String]()
    funcs.foreach(f => {
      result = f(input)
      if (!result.success())
        errors += result.error
    })
    Result(errors.toList.mkString("<br/>"), result.data)
  }

  def runUntilFirstFault[TIn, TOut](input: TIn, funcs: ((TIn) => Result[TOut])*): Result[TOut] = {
    var result: Result[TOut] = null
    funcs.foreach(f => {
      result = f(input)
      if (!result.success())
        return result
    })
    Result(data = result.data)
  }
}
