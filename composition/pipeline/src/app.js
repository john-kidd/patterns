import { Result } from "./result";
import { runAll } from "./workflow";

const result = new Result("an error has ocurred!");

document.write(`Success = ${result.success().toString()}`);

console.log(result.getError());