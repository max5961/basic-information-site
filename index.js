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
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const PORT = process.env.PORT || 8080;
const server = http.createServer((req, res) => {
    const urlHandler = new UrlHandler(req, res);
    urlHandler.handleGetUrl();
    res.writeHead(200, { "Content-Type": urlHandler.content.type });
    res.end(urlHandler.file);
});
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
class UrlHandler {
    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.content = {
            path: null,
            type: "text/html",
        };
        this.file = null;
    }
    handleGetUrl() {
        if (this.req.method !== "GET") {
            return;
        }
        if (this.req.url === "/") {
            this.content.path = path.join(__dirname, "./index.html");
        }
        else if (this.req.url === "/about") {
            this.content.path = path.join(__dirname, "./about.html");
        }
        else if (this.req.url === "/contact-me") {
            this.content.path = path.join(__dirname, "./contact-me.html");
        }
        else {
            this.content.path = path.join(__dirname, "./404.html");
        }
        this.file = fs.readFileSync(this.content.path, "utf-8");
    }
}
