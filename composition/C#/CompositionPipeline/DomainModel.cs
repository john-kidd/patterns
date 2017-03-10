using static CompositionPipeline.Shared.StringExtensions;
using CompositionPipeline.Common;

namespace CompositionPipeline
{
	public static class DomainModel
	{
		public const string INVALID_NAME_MESSAGE = "Invalid name";
		public const string EMAIL_ADDRESS_FORMAT_IS_INCORRECT_MESSAGE = "Email address format is incorrect";

		public static Result<Person> ValidateName(Person person) {
			if (string.IsNullOrWhiteSpace(person.Name))
				return new Result<Person>(INVALID_NAME_MESSAGE, person);

			return new Result<Person>(data: person);
		}

		public static Result<Person> ValidateEmailAddress(Person person) {
			if (person.EmailAddress.IsValidEmailAddress())
				return new Result<Person>(EMAIL_ADDRESS_FORMAT_IS_INCORRECT_MESSAGE, person);
			return new Result<Person>(data: person);
		}
	}
}
