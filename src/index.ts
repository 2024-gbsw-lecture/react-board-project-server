import { ZodError } from 'zod';
import { dotenv, dotenvSchema } from './libs/dotenv';
import { app } from './app';

dotenvSchema
  .parseAsync(dotenv)
  .then(() => {
    const port = dotenv.SERVER_PORT || 3000;

    app.listen(port, () =>
      console.log(`🚀 Server ready at: http://localhost:${port}`),
    );
  })
  .catch((error) => {
    const zodError = error as ZodError;

    if (zodError.issues.length > 0) {
      console.log(`환경변수 오류: ${zodError.issues[0].message}`);
    } else {
      console.log('오류 발생');
    }

    process.exit(1);
  });
