import { Router } from "express";
import { create, destroy, findAll, findOne, update } from "../controllers/student.controller.js";
import authJwt from "../middlewares/authJwt.js";
const studentRoute = Router()

studentRoute.use(authJwt)
studentRoute.get('/', findAll)
studentRoute.get('/:id', findOne)
studentRoute.post('/', create)
studentRoute.put('/:id', update)
studentRoute.delete('/:id', destroy)

export default studentRoute