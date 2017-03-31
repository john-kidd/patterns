import fund.DomainModel.Fund
import fund.common.Pipeline.Result

object PatchFundFixture {
  val HEDGE_FUND_FUND_TYPE = "Hedge Fund"
  val DRAWDOWN_VEHICLE_FUND_TYPE = "DrawDown Vehicle"
  val FUND_NAME = "Cardano Fund A"
  val FUND_ID = 1

  private var fundInDummyDb = Fund(1, FUND_NAME, HEDGE_FUND_FUND_TYPE)

  def getFund(fundId: Int): Fund = {
    fundInDummyDb
  }

  def writeToDb(updatedFund: Fund) = {
    fundInDummyDb = updatedFund
  }

  def updateFund(editedFund: Fund): Result[Fund] = {
    val existing = getFund(editedFund.fundId)
    val updated = Result(data = Fund(existing.fundId, editedFund.fundName, editedFund.fundType))

    writeToDb(updated.data)

    updated
  }

}
