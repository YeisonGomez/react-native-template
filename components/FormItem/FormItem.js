import React from 'react';
import { Icon, Item } from 'native-base';

const FormItem = ({ form, keyForm, input, options, ...props }) => {
  
  return (
    <Item {...props} error={form.getFieldError(keyForm) !== undefined}>
      {form.getFieldDecorator(keyForm, options)(input)}

      { form.getFieldError(keyForm) && <Icon name='close-circle' /> }
    </Item>
  )
}

export default FormItem