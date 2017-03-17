package fund

import fund.PatchInstructionService._
import fund.common.Pipeline._
import fund.common.StringExtensions._
import fund.common.SupportException

import scala.collection.mutable.ListBuffer

object DomainModel {
  val INVALID_FUND_NAME_MESSAGE = "Invalid fund name"
  val INVALID_FUND_TYPE_MESSAGE = "Invalid fund type"

  class PatchFundDto(val operation: String, val path: String, val value: String) { }

  case class Fund(fundId: Int, fundName: String, fundType: String)

  def validateFundName(fund: Fund): Result[Fund] = {
    fund.fundName match {
      case fundName if fundName.isNullOrEmpty => Result(INVALID_FUND_NAME_MESSAGE, fund)
      case _ => Result(data = fund)
    }
  }

  def validateFundType(fund: Fund): Result[Fund] = {
    fund.fundType match {
      case fundType if fundType.isNullOrEmpty => Result(INVALID_FUND_TYPE_MESSAGE, fund)
      case _ => Result(data = fund)
    }
  }

  def updateFundName(fundName: String) = {
    val apply = (data: Fund) => {
      Result(data = Fund(data.fundId, fundName, data.fundType))
    }: Result[Fund]
    apply
  }

  def updateFundType(fundType: String) = {
    val apply = (data: Fund) => {
      Result(data = Fund(data.fundId, data.fundName, fundType))
    }: Result[Fund]
    apply
  }

  def patchFund(id: Int, instructions: List[PatchFundDto], get: ((Int) => Fund), update: ((Fund) => Result[Fund])): Unit = {
    val fund = get(id)
    val funcs = ListBuffer[((Fund) => Result[Fund])](validateFundName, validateFundType)

    instructions.foreach(instruction => {
      instruction match {
        case instruction if instruction.path == "fundType" => funcs += patchFundType(fund, instruction)
        case instruction if instruction.path == "fundName" => funcs += patchFundName(fund, instruction)
      }
    })

    runUntilFirstFault(fund, funcs.toList) match {
      case result if result.success() => update(result.data)
      case result => throw new SupportException(result.error)
    }
  }
}

