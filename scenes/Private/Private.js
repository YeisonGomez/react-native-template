import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
import { useDispatch } from 'react-redux';

import i18n from '../../i18n/i18n'
import { auth as AuthActions } from '../../services/Auth/AuthActions'

export default function Private(props) {

  const dispatch = useDispatch()

  const logout = () => {
    dispatch(AuthActions.logout())
  }

  return (
    <Container>
      <Header>
        <Button onPress={logout}>
          <Text>{i18n.t('button.logout')}</Text>
        </Button>
      </Header>
      <Content />
      <Footer>
        <FooterTab>
          <Button>
            <Icon name="apps" />
          </Button>
          <Button>
            <Icon name="camera" />
          </Button>
          <Button active>
            <Icon active name="navigate" />
          </Button>
          <Button>
            <Icon name="person" />
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
