import { Result } from "./result";
import _ from 'lodash';

export function runAll(data, funcs) {
    const errors = [];
    let currentData = data;
    _.forEach(funcs, (f) => {
        const result = f(currentData);
        currentData = result.getData();
        if (!result.success()) errors.push(result.getError());
    });
    return new Result(errors.join("<br/>"), currentData);
}

export function runUntilFirstFault(data, funcs) {
    function hasError(data, funcs) {
        if (funcs.length === 0) return "";
        const result = funcs[0](data);
        if (!result.success()) return result.getError();
        funcs.shift();
        return hasError(result.getData(), funcs);
    }
    
    return new Result(hasError(data, funcs));
}