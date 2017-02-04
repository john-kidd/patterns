import { Result } from "./result";
import _ from 'lodash';

export function runAll(data, funcs) {
    const errors = [];
    _.forEach(funcs, (f) => {
        const result = f(data);
        if (!result.success()) errors.push(result.getError());
    });
    return new Result(errors.join("<br/>"));
}

export function runUntilFirstFault(data, funcs) {
    function hasError(funcs) {
        if (funcs.length === 0) return "";
        const result = funcs[0](data);
        if (!result.success()) return result.getError();
        funcs.shift();
        return hasError(funcs);
    }
    
    return new Result(hasError(funcs));
}