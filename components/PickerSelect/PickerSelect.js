import React from 'react';
import { Picker, Icon } from 'native-base';
import i18n from '../../i18n/i18n'

const PickerSelect = ({ items, placeholder, selectedValue, onValueChange }) => {
  return (
    <Picker
      mode="dropdown"
      iosHeader={i18n.t('label.selectItem')}
      placeholder={placeholder}
      headerBackButtonText={i18n.t('button.back')}
      iosIcon={<Icon name="arrow-down" />}
      style={{ width: undefined }}
      placeholderStyle={{ color: "#bfc6ea" }}
      placeholderIconColor="#007aff"
      selectedValue={selectedValue}
      onValueChange={onValueChange}
    >
      {items}
    </Picker>
  )
}

export default PickerSelect