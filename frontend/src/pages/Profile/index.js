import React, {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg'
import api from '../../services/api'
import './styles.css'


export default function Profile() {
    const [incidents, setIncidents] = useState([])
    const ongName = localStorage.getItem('ongName') //pega do armaz loc q eu mandei na autenticação do login
    const ongId = localStorage.getItem('ongId')
    const history = useHistory()

    useEffect(() => {
        api.get('/profile',{
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            setIncidents(response.data) //pega td da resposta do back e põe no incidents
        })
    },[ongId]) //A func é executada qnd o valor do array muda, se for vazio executa só uma vez

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`/incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id))
        }catch(err){
            alert('Erro ao deletar caso, tente novamente.')
        }
    }

    function handleLogout() {
        console.log('Logout')
        localStorage.clear()
        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt='Be the Hero' />
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onCLick={handleLogout} type="button">
                    <FiPower size={18} color = "#e02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => {
                    return(
                    <li key={incident.id}>
                        <strong>Caso:</strong>
                        <p>{incident.title}</p>

                        <strong>Descrição:</strong>
                        <p>{incident.description}</p>

                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-BR',{style:'currency', currency: 'BRL'}).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                    )
                })}
            </ul>
        </div>
            
    )
}