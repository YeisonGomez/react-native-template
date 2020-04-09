import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Private from './scenes/Private/Private';
import Public from './scenes/Public/Public';

export const Main = () => {
  const { authentication } = useSelector(state => state.auth)
  
  return false ? <Private /> : <Public />
}