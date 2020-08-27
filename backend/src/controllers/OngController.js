const connection = require('../database/connection')
const generateUniqueId = require('../utils/generateUniqueId')

module.exports = {
    async index(request,response) { //Esse index é padrão pra significar listagem
        const ongs = await connection('ongs').select('*')
    
        return response.json(ongs)
    },

    async create(request, response) { //create nesse caso é só o nome da função q a gnt deu, ñ é reservada
    //return response.send('Hello World!') Isso envia em formato de texto, como queremos json, usamos da maneira abaixo
    const {name, email, whatsapp, city, uf} = request.body

    const id = generateUniqueId() //Vai gerar 4 Bytes aleatórios hexadec pro id

    await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf
    })

    
    return response.json({id})

    }
}