const pool = require("../database/index")

const userController = {
    getById: async (req, res) => {
        try {
            const { id } = req.params
            const result = await pool.query("select * from profile where uid = ?", [id])
            data = result[0]
            res.json(data[0])
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
}

module.exports = userController