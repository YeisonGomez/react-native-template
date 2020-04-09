import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import es from './es';
import en from './en';

const languagesAvailables = ['es', 'en']

i18n.translations = {
  en,
  es,
};

//es-CO to es
const keySimpleLocal = Localization.locale.split('-')[0]
//Validate language availables
const languageSelect = languagesAvailables.includes(keySimpleLocal)? keySimpleLocal: 'en'
i18n.locale = languageSelect;

i18n.fallbacks = false;

export default i18n