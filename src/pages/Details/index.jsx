import {Container,Links,Content} from'./style.js'
import { Section } from '../../components/Section'
import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { Tag } from '../../components/Tag'
import { ButtonText } from '../../components/ButtonText'

export  function Details (){

  return (
    <Container>
      <Header/>
      <main>
        <Content>
      <ButtonText title="Excluir nota"/>
      <h1>Introdução ao React</h1>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. A quia excepturi inventore cum aut ipsa tenetur vero eum, corporis error labore alias omnis neque nulla, laborum beatae, veniam voluptatem ipsam.</p>

      <Section title="Links úteis">
        <Links>
          <li><a href="https://github.com/JordanGuimaraes17">Link 1</a></li>
          <li><a href="https://github.com/JordanGuimaraes17">Link 2</a></li>
        </Links>

        </Section>

        <Section title="Marcadores">
          <Tag title="express"/>
          <Tag title="nodejs"/>
        </Section>

      <Button title='Voltar'/>
      </Content>
      </main>
    </Container>
  )
}