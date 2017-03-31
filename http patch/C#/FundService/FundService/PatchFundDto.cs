namespace FundService
{


	public class PatchFundDto
	{
		public string Operation { get; }
		public string Path { get; }
		public string Value { get; }

		public PatchFundDto(string operation, string path, string value) {
			Operation = operation;
			Path = path;
			Value = value;
		}
	}
}
