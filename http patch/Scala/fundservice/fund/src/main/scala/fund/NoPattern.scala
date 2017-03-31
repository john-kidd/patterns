package fund

import fund.DomainModel.{Fund, PatchFundDto, validateFundName, validateFundType}
import fund.PatchInstructionService.{patchFundName, patchFundType}
import fund.common.Pipeline.Result
import fund.common.SupportException

import scala.collection.mutable.ListBuffer

object NoPattern {

  def patchFund(id: Int, instructions: List[PatchFundDto], get: ((Int) => Fund), update: ((Fund) => Result[Fund])): Unit = {
    val fund = get(id)
    val errors = new ListBuffer[String]

    val validateNameResult = validateFundName(fund)
    if (!validateNameResult.success())
      errors += validateNameResult.error

    var currentData = validateNameResult.data

    val validateFundTypeResult = validateFundType(fund)
    if (!validateFundTypeResult.success())
      errors += validateFundTypeResult.error

    currentData = validateFundTypeResult.data

    var patchFundNameResult = Result[Fund](data = null)

    instructions.foreach(instruction => {
      instruction match {
        case instruction if instruction.path == "fundType" => {
          val patchFundTypeResult = patchFundType(fund, instruction)(fund)
          if (!patchFundTypeResult.success())
            errors += patchFundTypeResult.error

          currentData = patchFundTypeResult.data
        }
        case instruction if instruction.path == "fundName" => {
          patchFundNameResult = patchFundName(fund, instruction)(fund)
          if (!patchFundNameResult.success())
            errors += patchFundNameResult.error

          currentData = patchFundNameResult.data
        }
      }
    })

    errors.length > 0 match {
      case _ => update(patchFundNameResult.data)
      case _ => throw new SupportException(patchFundNameResult.error)
    }
  }}
