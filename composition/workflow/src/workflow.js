import { Result } from "./result";
import _ from 'lodash';

export function runAll(data, funcs) {
    const errors = [];
    let copy = Object.assign({}, data);
    _.forEach(funcs, (f) => {
        const result = f(copy);
        copy = result.getData();
        if (!result.success()) errors.push(result.getError());
    });
    return new Result(errors.join("<br/>"), copy);
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