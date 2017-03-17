import PatchFundFixture._
import fund.DomainModel._
import org.scalatest.FunSpec

class PatchFundTests extends FunSpec {

  describe("PatchFund") {
    it("should set fund type to Hedge Fund") {
      // arrange
      val patchFundDtoStub = new PatchFundDto("replace", "fundType", DRAWDOWN_VEHICLE_FUND_TYPE)
      val instructionsStub = List(patchFundDtoStub)
      val fundIdStub = FUND_ID
      val expected = DRAWDOWN_VEHICLE_FUND_TYPE

      // act
      patchFund(fundIdStub, instructionsStub, getFund, updateFund)
      val actual = getFund(fundIdStub).fundType

      // assert
      assert(expected == actual)
    }
  }
}
