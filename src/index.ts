import { app } from './app';
import { dotenv } from './libs/dotenv';

const port = dotenv.SERVER_PORT || 3000;

app.listen(port, () =>
  console.log(`🚀 Server ready at: http://localhost:${port}`),
);
