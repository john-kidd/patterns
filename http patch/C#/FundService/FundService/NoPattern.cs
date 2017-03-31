using FundService.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using static FundService.DomainModel;
using static FundService.PatchInstructionService;

namespace FundService
{
    public static class NoPattern
    {
        public static void PatchFund(int id, List<PatchFundDto> instructions, Func<int, Fund> getFund, Func<Fund, Result<Fund>> updateFund) {
            var errors = new List<string>();
            Fund currentData = getFund(id);

            instructions.ForEach(instruction => {
                switch (instruction.Path) {
                    case FUND_TYPE:
                        var patchFundTypeResult = PatchFundType(currentData, instruction)(currentData);
                        if (!patchFundTypeResult.Success)
                            errors.Add(patchFundTypeResult.Error);
                        currentData = patchFundTypeResult.Data;
                        break;
                    case FUND_NAME:
                        var patchFundNameResult = PatchFundName(currentData, instruction)(currentData);
                        if (!patchFundNameResult.Success)
                            errors.Add(patchFundNameResult.Error);
                        currentData = patchFundNameResult.Data;
                        break;
                }
            });

            var validateNameResult = ValidateFundName(currentData);
            if (!validateNameResult.Success)
                errors.Add(validateNameResult.Error);

            currentData = validateNameResult.Data;

            var validateFundTypeResult = ValidateFundType(currentData);
            if (!validateFundTypeResult.Success)
                errors.Add(validateFundTypeResult.Error);

            currentData = validateFundTypeResult.Data;

            switch (errors.Any()) {
                case true:
                    throw new SupportException(string.Join("<br/>", errors));
                case false:
                    updateFund(currentData);
                    break;
            }
        }
    }
}
