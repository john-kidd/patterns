using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace CompositionPipeline.Common
{
	public static class Pipeline
	{
		public static Result<TData> runAll<TData>(TData data, params Func<TData, Result<TData>>[] funcs) {
			var errors = new List<string>();
			ProcessNext(errors, data, funcs);
			return errors.Any() ? new Result<TData>(string.Join("<br/>", errors)) : new Result<TData>();
		}

		static void ProcessNext<TData>(IList errors, TData data, IEnumerable<Func<TData, Result<TData>>> funcs) {
			if (!funcs.Any()) return;
			var f = funcs.First();
			var result = f(data);
			if (!result.Success)
				errors.Add(result.Error);
			var reduced = funcs.Where(x => x != f);
			ProcessNext(errors, result.Data, reduced);
		}
	}
}
