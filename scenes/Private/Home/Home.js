import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Container, Content, Item, Input, Button, Text, Spinner } from 'native-base';

//import i18n from '../../../i18n/i18n'

const Home = ({ match, form }) => {
  const dispatch = useDispatch()

  const { loading, error } = useSelector(state => state.auth)
  const [isFormError, setFormError] = useState()

  useEffect(() => {

  })

  return (
    <Container>
      <Content>
        <Text>Home</Text>

      </Content>
    </Container>
  )
}

export default Home