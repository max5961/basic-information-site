const http = require("node:http");
const path = require("node:path");
const fs = require("node:fs");

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
            this.getHomePagePath();
        } else if (this.req.url === "/about") {
            this.getAboutPath();
        } else if (this.req.url === "/contact-me") {
            this.getContactMePath();
        } else {
            this.getNotFoundPath();
        }

        this.file = fs.readFileSync(this.content.path, "utf-8");
    }

    getHomePagePath() {
        this.content.path = path.join(__dirname, "./index.html");
    }

    getAboutPath() {
        this.content.path = path.join(__dirname, "./about.html");
    }

    getContactMePath() {
        this.content.path = path.join(__dirname, "./contact-me.html");
    }

    getNotFoundPath() {
        this.content.path = path.join(__dirname, "./404.html");
    }
}
