import Student from "../models/Student.js"

export const create = (req, res) => {
    const newStudent = new Student({
        nama: req.body.nama,
        jurusan: req.body.jurusan,
        umur: req.body.umur,
    })

    Student.create(newStudent, (err, data) => {
        if(err) res.status(500).send({msg: "Exist some error"})
        res.send(data)
    })
}

export const findAll = (req, res) => {
    console.log(req.userId)
    Student.getAll((err, data) => {
        if(err) {
            console.log(err)
            return res.status(500).send({msg: "Exist some error"})
        }
        res.send(data)
    })
}

export const findOne = (req, res) => {
    Student.findById(req.params.id, (err, data) => {
        if(err) {
            if(err.type === 'not_found'){
                res.status(404).send({
                    message: `Not found student with id : ${req.params.id}`
                })
            } else {
                res.status(500).send({msg: "Exist some error"})
            }
        } else {
            res.send(data)
        }
    })
}

export const update = (req, res) => {
    console.log(req.body)
    const studentData = new Student(req.body)
    Student.update(req.params.id, studentData, (err, data) => {
        if(err) {
            if(err.type === 'not_found'){
                res.status(404).send({
                    message: `Not found student with id : ${req.params.id}`
                })
            } else {
                res.status(500).send({msg: "Exist some error"})
            }
        } else {
            res.send(data)
        }
    })
}

export const destroy = (req, res) => {
    Student.delete(req.params.id, (err, data) => {
        if(err) {
            if(err.type === 'not_found'){
                res.status(404).send({
                    message: `Not found student with id : ${req.params.id}`
                })
            } else {
                res.status(500).send({msg: "Exist some error"})
            }
        } else {
            res.send({msg: "Success delete student"})
        }
    })
}