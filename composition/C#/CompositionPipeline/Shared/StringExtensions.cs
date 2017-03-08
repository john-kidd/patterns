using System.Text.RegularExpressions;

namespace CompositionPipeline
{
	public static class StringExtensions
	{
		const string emailRegEx = "^[^@]+@[^@]+\\.[^@]+$";

		public static bool IsValidEmailAddress(this string s) {
			return string.IsNullOrWhiteSpace(s) || !Regex.IsMatch(s, emailRegEx);
		}
	}
}
