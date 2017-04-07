using System;

namespace CompositionPipeline.Common
{
    public class Result<TData>
    {
        public Result(string error = "", TData data = default(TData), Action compensate = null) {
            Data = data;
            Error = error;
            Compensate = compensate;
        }

        public string Error { get; }

        public TData Data { get; }

        public bool Success { get { return string.IsNullOrEmpty(Error); } }

        public Action Compensate { get; }

        public bool ShouldCompensate { get { return Compensate != null; } }
    }
}
