using System;
using System.Collections.Generic;
using System.Linq;

namespace FundService.Common
{
	public static class Pipeline
	{
		public static Result<TData> RunAll<TData>(TData data, List<Func<TData, Result<TData>>> funcs) {
			var errors = new List<string>();
            var compensators = new List<Action>();
			var currentData = data;
			foreach (var f in funcs) {
				var result = f(currentData);
				if (!result.Success)
					errors.Add(result.Error);
                if (result.ShouldCompensate)
                    compensators.Add(result.Compensate);
				currentData = result.Data;
			}
            if (errors.Any()) {
                compensators.ForEach(c => c());
                new Result<TData>(string.Join("<br/>", errors));
            }
			return new Result<TData>();
		}

		public static Result<TData> RunUntilFirstFault<TData>(TData data, List<Func<TData, Result<TData>>> funcs) {
			foreach (var result in funcs.Select(f => f(data)).Where(result => !result.Success)) {
                result.Compensate();
				return result;
			}
			return new Result<TData>();
		}
	}
}
