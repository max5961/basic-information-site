import express from "express";
import GetHandler from "./GetHandler";

const PORT: number | string = process.env.PORT || 8080;
const app = express();

const routes = ["/", "/about", "/contact-me"];

GetHandler.handleGetRequests(routes, app);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export type App = ReturnType<typeof express>;
