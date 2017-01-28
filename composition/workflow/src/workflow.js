import { Result } from "./result";

export function runAll(data, funcs) {
    const errors = [];
    for (let i = 0; i < funcs.length; i++) {
        const result = funcs[i](data);
        if (!result.success())
            errors.push(result.getError());        
    }
    return new Result(errors.join("<br/>"));
}