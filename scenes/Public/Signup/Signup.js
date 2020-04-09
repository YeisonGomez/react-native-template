import React, { useState, useRef, useLinking, useEffect } from 'react';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import { Link } from "react-router-native";
import { Container, Content, Item, Input } from 'native-base';

import i18n from '../../../i18n/i18n'

const Signup = ({ }) => {

  useEffect(() => {

  })
  
  return (
    <Container>
      <Content>
        <Item regular>
          <Input placeholder="Correo registro" />
        </Item>
        <Item regular>
          <Input placeholder="Contraseña" />
        </Item>
        <Link to={`/`} underlayColor="#f0f4f7">
          <Text>{i18n.t('button.login')}</Text>
        </Link>
      </Content>
    </Container>
  )
}

export default Signup 