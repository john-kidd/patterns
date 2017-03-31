using System;
using System.Collections.Generic;
using System.Linq;
using FundService.Common;
using static FundService.Common.Pipeline;

namespace FundService
{
	public static class DomainModel
	{
		public const string INVALID_FUND_NAME_MESSAGE = "Invalid fund name";
		public const string INVALID_FUND_TYPE_MESSAGE = "Invalid fund type";
        public const string FUND_TYPE = "fundType";
        public const string FUND_NAME = "fundName";


        public static Result<Fund> ValidateFundName(Fund fund) {
			if (string.IsNullOrWhiteSpace(fund.FundName)) return new Result<Fund>(INVALID_FUND_NAME_MESSAGE, fund);
			return new Result<Fund>(data: fund);
		}

		public static Result<Fund> ValidateFundType(Fund fund) {
			if (string.IsNullOrWhiteSpace(fund.FundType)) return new Result<Fund>(INVALID_FUND_TYPE_MESSAGE, fund);
			return new Result<Fund>(data: fund);
		}

		public static Func<Fund, Result<Fund>> UpdateFundName(string fundName) {
			return (fund) => {
				return new Result<Fund>(data: new Fund(fund.Id, fundName, fund.FundType));
			};
		}

		public static Func<Fund, Result<Fund>> UpdateFundType(string fundType) {
			return (fund) => {
				return new Result<Fund>(data: new Fund(fund.Id, fund.FundName, fundType));
			};
		}

		public static void PatchFund(int id, IEnumerable<PatchFundDto> instructions, Func<int, Fund> getFund, Func<Fund, Result<Fund>> updateFund) {
			var fund = getFund(id);
			var funcs = new List<Func<Fund, Result<Fund>>>();

			funcs.Add(ValidateFundName);
			funcs.Add(ValidateFundType);

			instructions.ToList().ForEach(instruction => {
				switch (instruction.Path) {
					case "fundName":
						funcs.Add(UpdateFundName(fund.FundName));
						break;
					case "fundType":
						funcs.Add(UpdateFundType(fund.FundType));
					break;
				}
			});

			var result = RunUntilFirstFault(fund, funcs);
			if (result.Success) updateFund(result.Data);
			else throw new SupportException(result.Error);
		}
	}
}
