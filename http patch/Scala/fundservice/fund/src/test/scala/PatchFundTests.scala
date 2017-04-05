import PatchFundFixture._
import fund.DomainModel._
import org.scalatest.FunSpec

class PatchFundTests extends FunSpec {

  describe("PatchFund") {
    it("No patter patch fund no error") {
      // arrange
      val patchFundDtoStub = new PatchFundDto("replace", "fundType", DRAWDOWN_VEHICLE_FUND_TYPE)
      val instructionsStub = List(patchFundDtoStub)
      val expected = DRAWDOWN_VEHICLE_FUND_TYPE

      // act
      patchFund(FUND_ID, instructionsStub, getFund, updateFund)
      val actual = getFund(FUND_ID).fundType

      // assert
      assert(expected == actual)
    }

    it("should set fund type to Hedge Fund") {
      // arrange
      val patchFundDtoStub = new PatchFundDto("replace", "fundType", DRAWDOWN_VEHICLE_FUND_TYPE)
      val instructionsStub = List(patchFundDtoStub)
      val expected = DRAWDOWN_VEHICLE_FUND_TYPE

      // act
      patchFund(FUND_ID, instructionsStub, getFund, updateFund)
      val actual = getFund(FUND_ID).fundType

      // assert
      assert(expected == actual)
    }
  }
}
