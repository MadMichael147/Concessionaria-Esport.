import {fastify} from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const database = new DatabaseMemory()
const server = fastify()

server.get('/', () => {
    return 'Rota padrão'
})

server.post('/esportivo', (request, reply) => {
// Acessando dados do corpo da requisição
    const {modelo, marca, potencia} = request.body
// Exibindo dados
//    console.log(body)
   
    // return 'cadastrar'
    database.create({
        modelo: modelo,
        marca: marca,
        potencia: potencia,
    })

    return reply.status(201).send
})

server.get('/esportivo', (request) => {
    const search = request.query.search
    console.log(search)
    const esportivos = database.list(search)
    console.log(esportivos)
    return esportivos
})

server.put('/esportivos/:id', (request, reply) => {
    const esportivoId = request.params.id
    const {modelo, marca, potencia} = request.body
    const esportivo = database.update(esportivoId, {
        modelo: modelo,
        marca: marca,
        potencia: potencia,
    })
    return reply.status(204).send()
})

server.delete('/esportivos/:id', (request, reply) => {
    const esportivoId = request.params.id

    database.delete(esportivoId)

    return reply.status(204).send()
}) 

server.listen({
    port: 3333,
})