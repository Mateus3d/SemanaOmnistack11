const connection = require('../database/connection')

//Responsável pelo perfil da Ong
module.exports = {
    async index(request,response){//Retorna casos específicos de uma ONG
        //Acessar os dados da ONG q tá logada
        const ong_id = request.headers.authorization

        const incidents = await connection('incidents')
            .where('ong_id',ong_id)
            .select('*')

        return response.json(incidents)
    }

}
