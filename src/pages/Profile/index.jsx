import { useState } from 'react'
import { api } from '../../services/api'
import { useAuth } from '../../hooks/auth'
import { Container, Form, Avatar } from './style'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi'
import avatarPlaceholder from '../../assets/avatar_placeholder.svg'

export function Profile() {
  const { user, updateProfile } = useAuth()
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [passwordOld, setPasswordOld] = useState('')
  const [passwordNew, setPasswordNew] = useState('')

  const avatarUrl = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : avatarPlaceholder
  const [avatar, setAvatar] = useState(avatarUrl)
  const [avatarFile, setAvatarFile] = useState(null)
  const navigate = useNavigate()

  async function handleUpdate() {
    const updated = {
      name,
      email,
      password: passwordNew,
      old_password: passwordOld
    }
    const userUpdated = Object.assign(user, updated)
    await updateProfile({ user: userUpdated, avatarFile })
    // Verificar se a senha atende ao comprimento mínimo (exemplo: 6 caracteres)
    const minLength = 6
    if (passwordNew.length < minLength) {
      return alert(`A senha deve ter pelo menos ${minLength} caracteres!`)
    }
  }

  function handleChangeAvatar(event) {
    const file = event.target.files[0]

    // Verificar se um arquivo foi selecionado
    if (file) {
      // Verificar a extensão do arquivo
      const allowedExtensions = ['jpg', 'jpeg', 'png']
      const fileExtension = file.name.split('.').pop().toLowerCase()

      if (allowedExtensions.includes(fileExtension)) {
        // A extensão é permitida, você pode prosseguir com o processamento do arquivo
        setAvatarFile(file)
        const imagePreview = URL.createObjectURL(file)
        setAvatar(imagePreview)
      } else {
        // A extensão não é permitida, informe ao usuário
        alert('Por favor, selecione um arquivo PNG ou JPG.')
        // Ou você pode limpar o campo de entrada para evitar processar o arquivo inválido
        event.target.value = null
      }
    }
  }

  function handleBack() {
    navigate(-1)
  }

  return (
    <Container>
      <header>
        <button type="button" onClick={handleBack}>
          <FiArrowLeft size={24} />
        </button>
      </header>
      <Form>
        <Avatar>
          <img src={avatar} alt="Foto do usuário" />
          <label htmlFor="avatar">
            <FiCamera />
            <input
              id="avatar"
              type="file"
              onChange={handleChangeAvatar}
              accept=".jpg, .jpeg, .png"
            />
          </label>
        </Avatar>
        <Input
          placeholder="Nome"
          type="text"
          icon={FiUser}
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Input
          placeholder="E-mail"
          type="email"
          icon={FiMail}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          placeholder="Senha atual"
          type="password"
          icon={FiLock}
          onChange={e => setPasswordOld(e.target.value)}
        />
        <Input
          placeholder="Nova senha"
          type="password"
          icon={FiLock}
          onChange={e => setPasswordNew(e.target.value)}
        />
        <Button title="Salvar" onClick={handleUpdate} />
      </Form>
    </Container>
  )
}
