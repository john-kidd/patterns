using NUnit.Framework;
using static CompositionPipeline.Common.Pipeline;
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
			var personStub = new Person(NAME_STUB, EMAIL_ADDRESS_STUB);
			var expected = "";

			// act
			var result = runAll(personStub, ValidateName, ValidateEmailAddress);
			var actual = result.Error;

			// assert
			AreEqual(expected, actual);
		}

		[Test]
		public void should_return_that_email_address_has_an_incorrect_format() {
			// arrange
			const string INCORRECTLY_FORMED_EMAIL_ADDRESS_STUB = "john.com";
			var personStub = new Person(NAME_STUB, INCORRECTLY_FORMED_EMAIL_ADDRESS_STUB);
			var expected = EMAIL_ADDRESS_FORMAT_IS_INCORRECT_MESSAGE;

			// act
			var result = runAll(personStub, ValidateName, ValidateEmailAddress);
			var actual = result.Error;

			// assert
			AreEqual(expected, actual);
		}
	}
}
