import React, { useState, useRef, useLinking, useEffect } from 'react';
import { Container } from 'native-base';
import { NativeRouter, Route } from "react-router-native";

import Login from './Login/Login';
import Signup from './Signup/Signup';

const Public = ({ }) => {

  useEffect(() => {

  })

  return (
    <NativeRouter>
      <Container>
        <Route exact path="/" component={Login} /> 
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Container>
    </NativeRouter>
  )
}

export default Public 