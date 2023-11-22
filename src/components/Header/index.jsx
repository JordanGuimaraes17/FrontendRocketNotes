import { RiShutDownLine } from 'react-icons/ri'
import { useAuth } from '../../hooks/auth'
import { Container, Profile, Logout } from './style'
export function Header() {
  const { signOut } = useAuth()
  return (
    <Container>
      <Profile to="/profile">
        <img
          src="https://github.com/JordanGuimaraes17.png"
          alt="Foto do usuário"
        />
        <div>
          <span>Bem-vindo</span>
          <strong>Jordan Guimarães</strong>
        </div>
      </Profile>

      <Logout onClick={signOut}>
        <RiShutDownLine />
      </Logout>
    </Container>
  )
}
