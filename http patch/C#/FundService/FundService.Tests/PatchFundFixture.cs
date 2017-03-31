using FundService.Common;

namespace FundService.Tests
{
    internal static class PatchFundFixture
    {
        internal const int FUND_ID_STUB = 1;
        internal const string FUND_NAME_STUB = "JFK Diversity";
        internal const string FUND_TYPE_STUB = "Hedge Fund";

        private static Fund dbFund = new Fund(FUND_ID_STUB, FUND_NAME_STUB, FUND_TYPE_STUB);

        internal static Fund GetFund(int id) {
            return dbFund.Id == id ? dbFund : null;
        }

        internal static Result<Fund> UpdateFund(Fund fund) {
            dbFund = new Fund(fund.Id, fund.FundName, fund.FundType);
            return new Result<Fund>(data: dbFund);
        }
    }
}
