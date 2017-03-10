using NUnit.Framework;
using static NUnit.Framework.Assert;
using CompositionPipeline.Common;

namespace CompositionPipeline.Tests
{
	[TestFixture]
	public class ResultTests
	{
		const string NAME_STUB = "John Kidd";
		const string EMAIL_ADDRESS_STUB = "jim.bob@waltons.com";

		static Result<Person> updateEmailAddress(Person person) {
			return new Result<Person>(data: new Person(name: person.Name, emailAddress: EMAIL_ADDRESS_STUB));
		}

		[Test]
		public void should_return_error_message_when_error_provided() {
			// arrange
			var errorStub = "an error";
			var target = new Result<string>(errorStub);

			// act
			var actual = target.Error;

			// assert
			AreEqual(errorStub, actual);
		}

		[Test]
		public void should_return_the_data() {
			// arrange
			var personStub = new Person(name: NAME_STUB);

			// act
			var target = new Result<Person>(data: personStub);
			var actual = target.Data;

			// assert
			AreEqual(personStub, actual);
		}

		[Test]
		public void should_return_an_updated_clone_of_the_data() {
			// arrange
			var personStub = new Person(name: NAME_STUB);

			// act
			var actual = updateEmailAddress(personStub).Data;

			// assert
			AreNotEqual(personStub, actual);
		}

		[Test]
		public void should_return_an_clone_of_the_data_with_additional_field() {
			// arrange
			var personStub = new Person(name: NAME_STUB);
			var expected = EMAIL_ADDRESS_STUB;

			// act
			var actual = updateEmailAddress(personStub).Data.EmailAddress;

			// assert
			AreEqual(expected, actual);
		}
	}
}
