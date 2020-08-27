const connection = require('../database/connection')

module.exports = {
    async index(request, response){
        const { page = 1} = request.query //Essa bagunça toda é pra limitar 5 itens por pagina:
        const [count] = await connection('incidents').count() //Pra saber o total de casos
        console.log(count)
        const incidents = await connection('incidents')
            .join('ongs','ongs.id','=','incidents.ong_id')
            .limit(5)
            .offset((page - 1)*5)
            .select(['incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'
            ])

        response.header('X-Total-Count',count['count(*)'])

        return response.json(incidents)
    },

    async create(request, response){
        const {title, description, value} = request.body
        const ong_id = request.headers.authorization //headers -> authorization foi a gnt q criou na requisição do insomnia

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        })

        return response.json({id})
    },

    async delete(request, response){
        const {id} = request.params //Parametro de rota, q vem em /incidents/*:id*
        //Vai usar o ong_id só pra ter ctz de q uma ong ñ pd apagar caso de outra
        const ong_id = request.headers.authorization

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first() //pega a primeira

        if(incident.ong_id != ong_id){
            return response.status(401).json({error: 'Operation not permitted.'}) //401 é acesso ñ autorizado
        }
        await connection('incidents').where('id',id).delete()

        return response.status(204).send() //Envia resposta positiva mas sem corpo vazia


    }
}