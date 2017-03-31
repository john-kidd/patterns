using NUnit.Framework;
using System.Collections.Generic;
using static FundService.Tests.PatchFundFixture;
using static FundService.DomainModel;
using static NUnit.Framework.Assert;

namespace FundService.Tests
{
    [TestFixture]
    public class PatchFundTests
    {
        [Test]
        public void NoPattern_PatchFund_NoErrors() {
            // arrange
            const string expected = "Fund";
            var instructions = new List<PatchFundDto> { new PatchFundDto("replace", FUND_TYPE, expected) };

            // act
            NoPattern.PatchFund(FUND_ID_STUB, instructions, GetFund, UpdateFund);
            var actual = GetFund(FUND_ID_STUB).FundType;

            // assert
            AreEqual(expected, actual);
        }

        [Test]
        public void WithPattern_PatchFund_NoErrors() {
            // arrange
            const string expected = "Fund";
            var instructions = new List<PatchFundDto> { new PatchFundDto("replace", FUND_TYPE, expected) };

            // act
            WithPattern.PatchFund(FUND_ID_STUB, instructions, GetFund, UpdateFund);
            var actual = GetFund(FUND_ID_STUB).FundType;

            // assert
            AreEqual(expected, actual);
        }
    }
}
