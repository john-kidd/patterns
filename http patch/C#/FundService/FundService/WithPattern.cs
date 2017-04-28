using FundService.Common;
using System;
using System.Collections.Generic;
using static FundService.DomainModel;
using static FundService.PatchInstructionService;
using static FundService.Common.Pipeline;

namespace FundService
{
    public static class WithPattern {
        public static void PatchFund(int id, IEnumerable<PatchFundDto> instructions, Func<int, Fund> getFund, Func<Fund, Result<Fund>> updateFund) {
            var fund = getFund(id);
            var funcs = new List<Func<Fund, Result<Fund>>>();

            instructions.ToList().ForEach(instruction => {
                switch (instruction.Path) {
                    case FUND_TYPE:
                        funcs.Add(PatchFundType(fund, instruction));
                        break;
                    case FUND_NAME:
                        funcs.Add(PatchFundName(fund, instruction));
                        break;
                }
            });

            funcs.Add(ValidateFundName);
            funcs.Add(ValidateFundType);

            var result = RunUntilFirstFault(fund, funcs);
            switch (result.Success) {
                case true:
                    updateFund(fund);
                    break;
                default:
                    throw new SupportException(result.Error);
            }
        }
    }
}
