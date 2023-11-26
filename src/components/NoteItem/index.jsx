import { Container } from './style'
import { FiPlus, FiX } from 'react-icons/fi'

export function NoteItem({ isNew, value, onClick, ...rest }) {
  return (
    <Container $isnew>
      <input type="text" value={value} readOnly={!isNew} {...rest} />
      <button
        onClick={onClick}
        type="button"
        className={isNew ? 'button-add' : 'button-delete'}
      >
        {isNew ? <FiPlus /> : <FiX />}
      </button>
    </Container>
  )
}
