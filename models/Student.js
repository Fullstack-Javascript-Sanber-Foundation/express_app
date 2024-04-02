import sql from "./connection.js";

const Student = function(siswa){
    this.nama = siswa.nama
    this.jurusan = siswa.jurusan
    this.umur = siswa.umur
}

Student.create = (newStudent, result) => {
    sql.query("INSERT INTO students SET ?", newStudent, (err, res) => {
        if(err) result(err, null)
        result(null, {id: res.insertId, newStudent})
    })
}

Student.getAll = (result) => {
    sql.query("SELECT * FROM students", (err, res) => {
        if(err) result(err, null)
        result(null, res)
    })
}

Student.findById = (id, result) => {
    sql.query(`SELECT * FROM students WHERE id = ${id}`, (err, res) => {
        if(err) {
            result(err, null)
            return
        }
        // jika data ditemukan
        if(res.length) {
            result(null, res[0])
            return
        }
        // jika kosong
        result({type: 'not_found'}, null)
    } )
}

Student.update = (id, data, result) => {
    sql.query("UPDATE students SET nama = ?, jurusan = ?, umur = ? WHERE id = ?", 
        [data.nama, data.jurusan, data.umur, id], (err, res) => {
            if(err) {
                result(err, null)
                return
            }

            if(res.affectedRows == 0){
                result({type: 'not_found'}, null)
                return
            }

            result(null, {id: id, data})

        })
}

Student.delete = (id, result) => {
    sql.query("DELETE FROM students WHERE id = ?", id, (err, res) => {
        if(err) {
            result(err, null)
            return
        }

        if(res.affectedRows == 0){
            result({type: 'not_found'}, null)
            return
        }

        result(null, res)
    })
}

export default Student