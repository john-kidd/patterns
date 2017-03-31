using System;
using System.Collections.Generic;
using System.Linq;

namespace FundService.Common
{
	public static class Pipeline
	{
		public static Result<TData> RunAll<TData>(TData data, List<Func<TData, Result<TData>>> funcs) {
			var errors = new List<string>();
			var currentData = data;
			foreach (var f in funcs) {
				var result = f(currentData);
				if (!result.Success)
					errors.Add(result.Error);
				currentData = result.Data;
			}
			return errors.Any() ? new Result<TData>(string.Join("<br/>", errors)) : new Result<TData>();
		}

		public static Result<TData> RunUntilFirstFault<TData>(TData data, List<Func<TData, Result<TData>>> funcs) {
			foreach (var result in funcs.Select(f => f(data)).Where(result => !result.Success)) {
				return result;
			}
			return new Result<TData>();
		}
	}
}
