import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import './styles.css'
import logoImg from '../../assets/logo.svg'
import api from '../../services/api'

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')

    const history = useHistory() 

    async function handleRegister(e) {
        e.preventDefault() //Função pra ñ deixar atualizar a pg
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        }

        try {
            const response = await api.post('/ongs', data) //Já manda pra api os dados colocados nos input (em json)
        //Lembrando q qnd enviamos o post pra criar a ONG, a api retorna o id
            alert(`Seu ID de acesso: ${response.data.id}`) //Esse data ñ é a variável acima q tem tds os dados, mas é um atributo pra acessar o obj do response
            history.push('/')//Vai redirecionar o user (pra raiz)
        }catch(err){
            alert('Erro no cadastro, tente novamente.')
        }

        
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt='Be the Hero'/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                    <Link className='back-link' to="/">
                        Não tenho cadastro
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input 
                    placeholder='Nome da ONG'
                    value = {name}
                    onChange={e => setName(e.target.value)} 
                />
                    <input 
                        type='email' 
                        placeholder='E-mail'
                        value = {email}
                        onChange={e => setEmail(e.target.value)} 
                />
                    <input 
                        placeholder='Whatsapp'
                        value = {whatsapp}
                        onChange={e => setWhatsapp(e.target.value)} 
                    />

                    <div className="input-group">
                        <input 
                            placeholder='Cidade'
                            value = {city}
                            onChange={e => setCity(e.target.value)} 
                        />
                        <input 
                            placeholder='UF' 
                            style={{width: 80}}
                            value = {uf}
                            onChange={e => setUf(e.target.value)} 
                        />
                    </div>

                    <button className='button' type='submit'>Cadastrar</button>
                </form>
            </div>
        </div>
    )
}