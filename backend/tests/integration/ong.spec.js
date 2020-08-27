const request = require('supertest')
const app = require('../../src/app') //roda o backend sem subir pro servidor 3333
const connection = require('../../src/database/connection')

describe('ONG',() => {
    beforeEach(async ()=>{
        await connection.migrate.rollback() //Desfaz a migration (apaga os dados do bd)
        await connection.migrate.latest() //Cria o bd
    })

    afterAll(async ()=> {
        await connection.destroy() //encerra a conexão com o bd
    })

    it('should be able to create a new ONG',async ()=>{
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "APAD2",
                email: "contato@apad.com.br",
                whatsapp: "6492284944",
                city: "Curitiba",
                uf: "PR"
            })
        //console.log(response.body)
        expect(response.body).toHaveProperty('id')
        expect(response.body.id).toHaveLength(8)
    })
})