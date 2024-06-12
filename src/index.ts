import express from "express";
import GetHandler from "./GetHandler";
import path from "path";

const PORT: number | string = process.env.PORT || 8080;
const app = express();

const publicDir = path.join(__dirname, "../public");
app.use("/static/style", express.static(path.join(publicDir, "style")));

const routes = ["/", "/about", "/contact-me"];
GetHandler.handleGetRequests(routes, app);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export type App = ReturnType<typeof express>;
