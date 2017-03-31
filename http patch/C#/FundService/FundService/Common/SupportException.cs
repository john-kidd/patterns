using System;
namespace FundService
{
	public class SupportException: Exception
	{
		public SupportException(string message): base(message) {
		}
	}
}
