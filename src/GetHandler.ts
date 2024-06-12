import { Request, Response } from "express";
import { App } from "./index";
import * as path from "path";
import * as fs from "fs/promises";

const publicDir = path.join(__dirname, "../public");

export default class GetHandler {
    private request: Request;
    private response: Response;
    private path: string | null;

    constructor(request: Request, response: Response) {
        this.request = request;
        this.response = response;
    }

    async handle(route: string): Promise<void> {
        if (route === "/") {
            this.path = path.join(publicDir, "html", "index.html");
        } else {
            this.path = path.join(publicDir, "html", route) + ".html";
        }

        try {
            const file = await fs.readFile(this.path, "utf-8");
            this.response.status(200).send(file);
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
        app.use(async (request: Request, response: Response) => {
            const notFound = await fs.readFile(
                path.join(publicDir, "html", "./404.html"),
                "utf-8",
            );
            response.status(404).send(notFound);
        });
    }
}
