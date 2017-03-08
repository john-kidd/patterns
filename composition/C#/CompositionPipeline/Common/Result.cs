using System;
namespace CompositionPipeline
{
	public class Result<TData>
	{
		public Result(string error = "", TData data = default(TData)) {
			Data = data;
			Error = error;
		}

		public string Error {
			get;
			private set;
		}

		public TData Data {
			get;
			private set;
		}

		public bool Success { get { return !string.IsNullOrEmpty(Error); } }
	}
}
