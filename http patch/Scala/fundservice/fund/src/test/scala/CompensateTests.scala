import fund.DomainModel._
import fund.common.Pipeline._
import org.scalatest.FunSpec

class CompensateTests extends FunSpec {
    describe("Compensate") {
      it("publishUpdate should compensate on error") {
        // arrange
        var compensated = false
        val logInfo = (message: String) => {
          println(message)
          compensated = true
        }
        val fundStub = Fund(1, "Fund A", "Fund Type A")
        val funcs = List[((Fund) => Result[Fund])](validateFundName, publishUpdate(fundStub, logInfo))

        // act
        runAll(fundStub, funcs)

        // assert
        assert(compensated)
      }
    }
}
