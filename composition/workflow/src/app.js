import { Request } from "./request";

const request = new Request("an error has ocurred!");

document.write(request.success().toString());

console.log(request.getError());