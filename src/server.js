import app from "./app.js";
import { env } from "./configs/env.js";

app.listen(env.port, () => {
    console.log(`Auth service running on port ${env.port}`);
});