import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { dbconnect } from './config/db.config'
import data from './routes/data.route'
import auth from './routes/auth.route'

const app = new Hono()

app.use(cors())


 dbconnect()
  app.route('/api',data);
 app.route('/auth',auth);
app.get('/hello', async (c) => {

  const data = {
    message: "Hello BHVR!",
    success: true
  }

  return c.json(data, { status: 200 })
})

export default app
