import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { dbconnect } from './config/db.config'
import data from './routes/data.route'
import auth from './routes/auth.route'
import settings from './routes/settings.route'

const app = new Hono();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))
app.use("*", async (c, next) => {
  console.log("PID handling request:", process.pid);
  await next();
});


 dbconnect()

  app.route('/api',data);
 app.route('/auth',auth);
 app.route('/settings', settings );

 
 Bun.serve({
  port:3000,
  reusePort: true, 
  fetch: app.fetch,
});

export default app
