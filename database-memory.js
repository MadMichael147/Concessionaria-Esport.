import { randomUUID } from "crypto"

export class DatabaseMemory{
#esportivos = new Map()

list(search){
    return Array.from(this.#esportivos.entries()).map((esportivosArray) =>{
    // acessando primeira posição
        const id = esportivosArray[0]
        const data = esportivosArray[1]

        return{
            id,
            ...data
        }
    })
    .filter(esportivo => {
        if (search){
            return esportivo.modelo.includes(search)
        }
        return true
    })
}
create(esportivo){
    const esportivoId = randomUUID()
    this.#esportivos.set(esportivoId, esportivo)
}
update(id, esportivo){
    this.#esportivos.set(id, esportivo)
}
delete(id, esportivo){
    this.#esportivos.delete(id, esportivo)
}
}