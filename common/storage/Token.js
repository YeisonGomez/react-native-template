import { AsyncStorage } from 'react-native';

const key = '@token'

export const save = async (token) => {
  try {
    await AsyncStorage.setItem(key, token);
    return { success: 'OK' }
  } catch (error) {
    return { error: 'ERROR' }
  }
}
export const get = async() => {
  return await AsyncStorage.getItem(key);
}

export const remove = async() => {
  return await AsyncStorage.removeItem(key);
}

export const isToken = async() => {
  return (await AsyncStorage.getItem(key)) !== undefined;
}