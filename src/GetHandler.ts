import express, { Request, Response } from "express";
import { App } from "./index";
import * as path from "path";

const publicDir = path.join(__dirname, "../public");

export default class GetHandler {
    private request: Request;
    private response: Response;
    private path: string | null;

    constructor(request: Request, response: Response) {
        this.request = request;
        this.response = response;
    }

    handle(route: string): void {
        if (route === "/") {
            this.path = path.join(publicDir, "html", "index.html");
        } else {
            this.path = path.join(publicDir, "html", route) + ".html";
        }

        try {
            this.response.status(200).sendFile(this.path);
        } catch (err) {
            this.response.status(404).send("Could not load file");
        }
    }

    static handleGetRequests(routes: string[], app: App): void {
        for (const r of routes) {
            app.get(r, (request: Request, response: Response) => {
                const handler = new GetHandler(request, response);
                handler.handle(r);
            });
        }

        GetHandler.handleNotFound(app);
    }

    static async handleNotFound(app: App): Promise<void> {
        app.use("/unhandled", express.static(path.join(publicDir, "style")));

        const unhandledDir = path.join(publicDir, "unhandled");
        app.use((request: Request, response: Response) => {
            const html = path.join(unhandledDir, "index.html");
            response.status(404).sendFile(html);
        });
    }
}
