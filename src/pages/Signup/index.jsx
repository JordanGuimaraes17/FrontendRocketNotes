import { useState } from 'react'
import { Button } from '../../components/Button'
import { Container, Form, Background } from './style'
import { Input } from '../../components/Input'
import { FiMail, FiLock, FiUser } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/api'
import { ButtonText } from '../../components/ButtonText'

export function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  function backNavigate() {
    navigate(-1)
  }

  function handleSignUp() {
    if (!name || !email || !password) {
      return alert('prencha todos campos!')
    }
    // Verificar se o nome possui um formato específico (apenas letras e espaços)
    const nameRegex = /^[a-zA-Z\s]+$/
    if (!nameRegex.test(name)) {
      return alert('O nome deve conter apenas letras e espaços!')
    }
    // Verificar se o e-mail possui um formato válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return alert('Digite um e-mail válido!')
    }

    // Verificar se a senha atende ao comprimento mínimo (exemplo: 6 caracteres)
    const minLength = 6
    if (password.length < minLength) {
      return alert(`A senha deve ter pelo menos ${minLength} caracteres!`)
    }

    api
      .post('/users', { name, email, password })
      .then(() => {
        alert('Usuário cadastrado com sucesso!')
        navigate(-1)
      })
      .catch(error => {
        if (error.response) {
          alert(error.response.data.message)
        } else {
          alert('não foi possivel cadastar')
        }
      })
  }

  return (
    <Container>
      <Background />
      <Form>
        <h1>Rocketnotes</h1>
        <p>Aplicação para salvar e gerenciar seus links úteis.</p>
        <h2>Crie sua conta</h2>

        <Input
          placeholder=" Nome"
          type="text"
          icon={FiUser}
          onChange={e => setName(e.target.value)}
        />

        <Input
          placeholder=" E-mail"
          type="email"
          icon={FiMail}
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          placeholder=" Senha"
          type="password"
          icon={FiLock}
          onChange={e => setPassword(e.target.value)}
        />
        <Button title="Cadastrar" onClick={handleSignUp} />
        <ButtonText title="Voltar para o login" onClick={backNavigate} />
      </Form>
    </Container>
  )
}
