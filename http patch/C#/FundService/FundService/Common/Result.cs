namespace FundService.Common
{
	public class Result<TData>
	{
		public Result(string error = "", TData data = default(TData)) {
			Data = data;
			Error = error;
		}

		public string Error { get; }

		public TData Data { get; }

		public bool Success { get { return string.IsNullOrEmpty(Error); } }
	}
}
