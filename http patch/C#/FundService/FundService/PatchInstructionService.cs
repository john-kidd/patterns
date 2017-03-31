using FundService.Common;
using System;
using static FundService.DomainModel;

namespace FundService
{
    public static class PatchInstructionService
    {
        public static Func<Fund, Result<Fund>> PatchFundType(Fund fund, PatchFundDto instruction)  {
            switch (instruction.Operation) {
                case "replace": return UpdateFundType(instruction.Value);
            }
            return null;
        }
        public static Func<Fund, Result<Fund>> PatchFundName(Fund fund, PatchFundDto instruction)
        {
            switch (instruction.Operation) {
                case "replace": return UpdateFundName(instruction.Value);
            }
            return null;
        }
    }
    
}
