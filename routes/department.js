import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addDepartment,getDepartments,getDepartment,updateDepartment, deleteDepartment } from '../controllers/departmentController.js'

const router = express.Router()

router.post('/add',authMiddleware,addDepartment)
router.get('/:id',authMiddleware,getDepartment)
router.put('/:id',authMiddleware,updateDepartment)
router.delete('/:id',authMiddleware,deleteDepartment)
router.get('/',authMiddleware,getDepartments)

export default router