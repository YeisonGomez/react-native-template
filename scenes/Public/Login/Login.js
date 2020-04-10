import React, { useState, useRef, useLinking, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-native";
import { Container, Content, Item, Input, Button, Text, Spinner } from 'native-base';
import { createForm } from 'rc-form';

import i18n from '../../../i18n/i18n'
import { auth as AuthActions } from '../../../services/Auth/AuthActions'

const Login = ({ match, form }) => {
  const dispatch = useDispatch()
  const { getFieldDecorator, setFieldsValue } = form;

  const { loading, error } = useSelector(state => state.auth)
  const [isFormError, setFormError] = useState()

  const submit = (e) => {
    if(!loading){
      form.validateFields({ suppressWarning: true }, (error, value) => {
        if (!error) {
          setFormError(false)
          dispatch(AuthActions.login(value.email, value.password))
        } else
          setFormError(true)
      });
    }
  }

  return (
    <Container>
      <Content>
        <Item regular>
          {getFieldDecorator('email', { rules: [{ required: true }] })(
            <Input type="email" placeholder={i18n.t('label.email')} onChangeText={email => setFieldsValue({ email })} />
          )}
        </Item>
        <Item regular>
          {getFieldDecorator('password', { rules: [{ required: true }] })(
            <Input secureTextEntry placeholder={i18n.t('label.password')} onChangeText={password => setFieldsValue({ password })} />
          )}
        </Item>

        {isFormError && <Text>{i18n.t('error.required')}</Text>}
        {error.login && !isFormError && <Text>{i18n.t('error.login.' + error.login)}</Text>}

        <Button success onPress={submit}>
          { loading && <Spinner color='green'/> }
          <Text>{i18n.t('button.login')}</Text>
        </Button>

        <Link to={`${match.url === '/' ? '' : match.url}/signup`} underlayColor="#f0f4f7">
          <Text>¡{i18n.t('button.signup')}!</Text>
        </Link>

      </Content>
    </Container>
  )
}

export default createForm()(Login)