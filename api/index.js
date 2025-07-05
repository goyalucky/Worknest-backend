import cors from 'cors'
import express from 'express'
import connectToDatabase from '../db/db.js'
import attendanceRouter from '../routes/attendance.js'
import authRouter from "../routes/auth.js"
import dashboardRouter from "../routes/dashboard.js"
import departmentRouter from "../routes/department.js"
import employeeRouter from "../routes/employee.js"
import leaveRouter from "../routes/leave.js"
import salaryRouter from "../routes/salary.js"
import settingRouter from "../routes/setting.js"

// Connect to database
connectToDatabase()

// Initialize express app
const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.static('public/uploads'))

// Routes
app.use('/api/auth', authRouter)
app.use('/api/department', departmentRouter)
app.use('/api/employee', employeeRouter)
app.use('/api/salary', salaryRouter)
app.use('/api/leave', leaveRouter)
app.use('/api/setting', settingRouter)
app.use('/api/dashboard', dashboardRouter)
app.use('/api/attendance', attendanceRouter)

// Optional root route for test
app.get("/", (req, res) => {
  res.send("API is working!");
})

// Important: export the app (do NOT use app.listen here)
export default app
