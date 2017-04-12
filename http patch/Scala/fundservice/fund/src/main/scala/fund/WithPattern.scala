package fund

import fund.DomainModel._
import fund.PatchInstructionService._
import fund.common.Pipeline._
import fund.common.SupportException

import scala.collection.mutable.ListBuffer

object WithPattern {

  def patchFind(id: Int, instructions: List[PatchFundDto], getFund: ((Int) => Fund), updateFund: ((Fund) => Result[Fund])): Unit = {
    val fund = getFund(id)
    val funcs = ListBuffer[((Fund) => Result[Fund])]()

    instructions.foreach(instruction => {
      instruction.path match {
        case "fundType" => funcs += patchFundType(fund, instruction)
        case "fundName" => funcs += patchFundType(fund, instruction)
      }
    })

    funcs += publishUpdate(fund, println)
    funcs += validateFundName
    funcs += validateFundType

    runUntilFirstFault(fund, funcs.toList) match {
      case result if result.success() => updateFund(result.data)
      case result => throw new SupportException(result.error)
    }
  }
}
