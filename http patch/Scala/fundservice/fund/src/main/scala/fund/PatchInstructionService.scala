package fund

import fund.DomainModel._

object PatchInstructionService {

  def patchFundType(fund: Fund, instruction: PatchFundDto) = {
    instruction match {
      case instruction if instruction.operation == "replace" => updateFundType(instruction.value)
    }
  }

  def patchFundName(fund: Fund, instruction: PatchFundDto) = {
    instruction match {
      case instruction if instruction.operation == "replace" => updateFundName(instruction.value)
    }
  }
}
