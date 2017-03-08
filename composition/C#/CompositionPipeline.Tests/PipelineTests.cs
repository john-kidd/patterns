using NUnit.Framework;
using static CompositionPipeline.Pipeline;
using static CompositionPipeline.DomainModel;
using static NUnit.Framework.Assert;

namespace CompositionPipeline.Tests
{
	[TestFixture]
	public class PipelineTests
	{
		const string NAME_STUB = "John Kidd";
		const string EMAIL_ADDRESS_STUB = "john@test.com";

		[Test]
		public void should_return_that_we_have_no_errors() {
			// arrange
			var personStub = new Person(name: NAME_STUB);
			var expected = "";

			// act
			var result = runAll(personStub, ValidateName, ValidateEmailAddress);
			var actual = result.Error;

			// assert
			AreEqual(expected, actual);
		}
	}
}
