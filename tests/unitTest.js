import { expect } from "chai";
import config from "config";
import {request} from "supertest";
import service from "../service.js";

// Testing server port
describe("Server", ()=>{
    it("tests that server is running in the current port", ()=>{
        expect(service.port).to.equal(parseInt(config.get("app.port")));
    })
});


// Testing api end point
