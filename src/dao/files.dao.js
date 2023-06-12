const fs = require('fs')

class FilesDao {
    constructor(file) {
        this.file = process.cwd () + `/src/dao/files/${file}`
    }

    async getItemsDao(){
        if (fs.existsSync(this.file)) {
            try {
                const data = await fs.promises.readFile(this.file)
                const items = JSON.parse(data)
                return items
            } catch (error) {
                res.status(400).json({status: 'error', error})
            }
        }
        return 'El archivo no existe'
    }
}

module.exports = FilesDao