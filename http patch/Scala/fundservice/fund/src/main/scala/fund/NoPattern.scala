package fund

import fund.DomainModel._
import fund.PatchInstructionService.{patchFundName, patchFundType}
import fund.common.Pipeline.Result
import fund.common.SupportException

import scala.collection.mutable.ListBuffer

object NoPattern {

  def patchFund(id: Int, instructions: List[PatchFundDto], get: ((Int) => Fund), update: ((Fund) => Result[Fund])): Unit = {
    val errors = new ListBuffer[String]
    var currentData = get(id)
    var patchFundNameResult = Result[Fund](data = null)

    instructions.foreach(instruction => {
      instruction match {
        case instruction if instruction.path == "fundType" => {
          val patchFundTypeResult = patchFundType(currentData, instruction)(currentData)
          if (!patchFundTypeResult.success())
            errors += patchFundTypeResult.error

          currentData = patchFundTypeResult.data
        }
        case instruction if instruction.path == "fundName" => {
          patchFundNameResult = patchFundName(currentData, instruction)(currentData)
          if (!patchFundNameResult.success())
            errors += patchFundNameResult.error

          currentData = patchFundNameResult.data
        }
      }
    })

    val publishUpdateResult = publishUpdate(currentData, println)(currentData);
    if (!publishUpdateResult.success())
      errors += publishUpdateResult.error

    val validateNameResult = validateFundName(currentData)
    if (!validateNameResult.success())
      errors += validateNameResult.error

    currentData = validateNameResult.data

    val validateFundTypeResult = validateFundType(currentData)
    if (!validateFundTypeResult.success())
      errors += validateFundTypeResult.error

    errors.length > 0 match {
      case _ => update(currentData)
      case _ => throw new SupportException(errors.mkString("<br/>"))
    }
  }
}
