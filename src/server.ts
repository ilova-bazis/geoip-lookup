import createApp from "./app";
import { config } from "./configs/config";

createApp()
    .then((app) => app.listen(config.PORT, () => console.log(`⚡️[server]: Server is running at http://localhost:${config.PORT}`)))
    .catch((err) => console.log(err));