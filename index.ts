import express, { Request, Response } from "express";
import * as path from "path";
import * as fs from "fs/promises";

const PORT: number | string = process.env.PORT || 8080;
const app = express();

const routes = ["/", "/about", "/contact-me"];

handleGetRequests(routes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

class GetHandler {
    private request: Request;
    private response: Response;
    private path: string | null;

    constructor(request: Request, response: Response) {
        this.request = request;
        this.response = response;
    }

    async handle(route: string): Promise<void> {
        if (route === "/") {
            this.path = path.join(__dirname, "./index.html");
        } else {
            this.path = path.join(__dirname, route) + ".html";
        }

        const file = await fs.readFile(this.path, "utf-8");
        this.response.status(200).send(file);
    }
}

function handleGetRequests(routes: string[]): void {
    for (const r of routes) {
        app.get(r, (request: Request, response: Response) => {
            const handler = new GetHandler(request, response);
            handler.handle(r);
        });
    }

    handleNotFound();
}

async function handleNotFound(): Promise<void> {
    app.use(async (request: Request, response: Response) => {
        const notFound = await fs.readFile(
            path.join(__dirname, "./404.html"),
            "utf-8",
        );
        response.status(404).send(notFound);
    });
}
