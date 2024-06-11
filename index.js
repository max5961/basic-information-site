"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs/promises"));
const PORT = process.env.PORT || 8080;
const app = (0, express_1.default)();
const routes = ["/", "/about", "/contact-me"];
handleGetRequests(routes);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
class GetHandler {
    constructor(request, response) {
        this.request = request;
        this.response = response;
    }
    handle(route) {
        return __awaiter(this, void 0, void 0, function* () {
            if (route === "/") {
                this.path = path.join(__dirname, "./index.html");
            }
            else {
                this.path = path.join(__dirname, route) + ".html";
            }
            const file = yield fs.readFile(this.path, "utf-8");
            this.response.status(200).send(file);
        });
    }
}
function handleGetRequests(routes) {
    for (const r of routes) {
        app.get(r, (request, response) => {
            const handler = new GetHandler(request, response);
            handler.handle(r);
        });
    }
    handleNotFound();
}
function handleNotFound() {
    return __awaiter(this, void 0, void 0, function* () {
        app.use((request, response) => __awaiter(this, void 0, void 0, function* () {
            const notFound = yield fs.readFile(path.join(__dirname, "./404.html"), "utf-8");
            response.status(404).send(notFound);
        }));
    });
}
