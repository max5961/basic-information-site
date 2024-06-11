import * as http from "http";
import * as path from "path";
import * as fs from "fs";

const PORT = process.env.PORT || 8080;

// 1000% unnecessary to create this type, but just for practice
type Server = ReturnType<typeof http.createServer>;

const server: Server = http.createServer((req, res) => {
    const urlHandler = new UrlHandler(req, res);
    urlHandler.handleGetUrl();

    res.writeHead(200, { "Content-Type": urlHandler.content.type });
    res.end(urlHandler.file);
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

class UrlHandler {
    public content: { path: string | null; type: string };
    public req: http.IncomingMessage;
    public res: http.OutgoingMessage;
    public file: string | null;

    constructor(req: http.IncomingMessage, res: http.OutgoingMessage) {
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
        } else if (this.req.url === "/about") {
            this.content.path = path.join(__dirname, "./about.html");
        } else if (this.req.url === "/contact-me") {
            this.content.path = path.join(__dirname, "./contact-me.html");
        } else {
            this.content.path = path.join(__dirname, "./404.html");
        }

        this.file = fs.readFileSync(this.content.path!, "utf-8");
    }
}
