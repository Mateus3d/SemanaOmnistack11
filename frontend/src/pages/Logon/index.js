import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'
import api from '../../services/api'
import './styles.css'
//import { FiLogIn} from 'react-icons' <FiLogIn size={16} color="#E02041"/> //Icone

export default function Logon() {
    const [id, setId] = useState('')
    const history = useHistory()

    async function handleLogin(e) {
        //Vai verificar se a ong existe
        e.preventDefault()
        try { 
            const response = await api.post('/session',{id})

            localStorage.setItem('ongId', id)
            localStorage.setItem('ongName', response.data.name)

            history.push('/profile')
        }catch(err){
            alert('Falha no Login, tente novamente.')
        }
    }
    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>

                <form onSubmit = {handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input 
                        placeholder="Sua ID" 
                        value = {id}
                        onChange = {e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className='back-link' to="/register">
                        Não tenho cadastro
                    </Link>
                </form>

            </section>
            <img src={heroesImg} alt="Heroes"/>
        </div>
    )
}