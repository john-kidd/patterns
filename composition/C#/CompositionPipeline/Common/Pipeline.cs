using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace CompositionPipeline
{
	public static class Pipeline
	{
		public static Result<TData> runAll<TData>(TData data, params Func<TData, Result<TData>>[] funcs) {
			var errors = new List<string>();
			var result = ProcessNext(errors, data, funcs);
			return errors.Any() ? new Result<TData>(string.Join("<br/>", errors)) : new Result<TData>();
		}

		static TData ProcessNext<TData>(IList errors, TData data, IEnumerable<Func<TData, Result<TData>>> funcs) {
			if (!funcs.Any()) return data;
			var f = funcs.First();
			var result = f(data);
			if (!result.Success)
				errors.Add(result.Error);
			var reduced = funcs.Where(x => x != f);
			return ProcessNext(errors, result.Data, reduced);
		}
	}
}
