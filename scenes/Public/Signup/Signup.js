import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-native";
import { Container, Content, Item, Input, Button, Text, Spinner, Picker, Icon, CheckBox } from 'native-base';
import { createForm } from 'rc-form';

import i18n from '../../../i18n/i18n'
import LANGUAGES from '../../../common/constants/Languages'
import { auth as AuthActions } from '../../../services/Auth/AuthActions'
import { utilities as utilActions } from '../../../services/Utilities/UtilitiesActions'
import PickerSelect from '../../../components/PickerSelect/PickerSelect'
import FormItem from '../../../components/FormItem/FormItem'  
 
const Signup = ({ form }) => {
  const dispatch = useDispatch()
  const { getFieldDecorator, setFieldsValue, validateFields, getFieldValue, isFieldValidating, getFieldError, getFieldsError } = form;

  const { countrys, citys } = useSelector(state => state.utilities)
  const { loading, error } = useSelector(state => state.auth)
  const [isFormError, setFormError] = useState()
  const [isXM, setIsXM] = useState(false)
  const [isTerms, setIsTerms] = useState(false)

  useEffect(() => {
    dispatch(utilActions.getCountrys())
  }, [])

  const submit = (e) => {
    if (!loading) {
      validateFields({ suppressWarning: true }, (error, value) => {
        if (!error) {
          setFormError(false)
          dispatch(AuthActions.signup(value))
        } else
          setFormError(true)
      });
    }
  }

  const onCountryChange = (country) => {
    setFieldsValue({ country })
    dispatch(utilActions.getCitys(country.objectId))
  }

  const onTermsChange = () => {
    setIsTerms(!isTerms)
    setFieldsValue({ terms: !isTerms })
  }

  return (
    <Container>
      <Content>
        <FormItem regular
          form={form}
          keyForm='name'
          options={{ rules: [{ required: true, min: 2, max: 50 }] }}
          input={
            <Input placeholder={i18n.t('label.name')} onChangeText={name => setFieldsValue({ name })} />
          }
        />

        <FormItem regular
          form={form}
          keyForm='lastname'
          options={{ rules: [{ required: true, min: 2, max: 50 }] }}
          input={
            <Input placeholder={i18n.t('label.lastname')} onChangeText={lastname => setFieldsValue({ lastname })} />
          }
        />

        <FormItem regular
          form={form}
          keyForm='phone'
          options={{ rules: [{ required: true, min: 9, max: 15 }] }}
          input={
            <Input keyboardType="numeric" placeholder={i18n.t('label.phone')} onChangeText={phone => setFieldsValue({ phone })} />
          }
        />

        <FormItem regular
          form={form}
          keyForm='country'
          options={{ rules: [{ required: true }] }}
          input={
            <PickerSelect
              placeholder={i18n.t('label.country')}
              selectedValue={getFieldValue('country')}
              onValueChange={onCountryChange}
              items={countrys.map(country =>
                <Picker.Item label={country.emoji + ' ' + country.name} value={country} />
              )}
            />
          }
        />

        <FormItem regular
          form={form}
          keyForm='city'
          options={{ rules: [{ required: true }] }}
          input={
            <PickerSelect
              placeholder={i18n.t('label.city')}
              selectedValue={getFieldValue('city')}
              onValueChange={(city) => setFieldsValue({ city })}
              items={citys.map(city =>
                <Picker.Item label={city.name} value={city.cityId} />
              )}
            />
          }
        />

        <FormItem regular
          form={form}
          keyForm='language'
          options={{ rules: [{ required: true }] }}
          input={
            <PickerSelect
              placeholder={i18n.t('label.language')}
              selectedValue={getFieldValue('language')}
              onValueChange={(language) => setFieldsValue({ language })}
              items={LANGUAGES.map(lng =>
                <Picker.Item label={i18n.t('language.' + lng)} value={lng} />
              )}
            />
          }
        />

        <FormItem regular
          form={form}
          keyForm='language'
          options={{ rules: [{ required: true }] }}
          input={
            <PickerSelect
              placeholder={i18n.t('label.language')}
              selectedValue={getFieldValue('language')}
              onValueChange={(language) => setFieldsValue({ language })}
              items={LANGUAGES.map(lng =>
                <Picker.Item label={i18n.t('language.' + lng)} value={lng} />
              )}
            />
          }
        />

        <Item regular>
          <Text>{i18n.t('label.accountXmQuestion')}</Text>
          {getFieldDecorator('isXm')(<CheckBox checked={isXM} onPress={() => setIsXM(!isXM)} />)}
        </Item>


        {isXM &&
          <FormItem regular
            form={form}
            keyForm='accountXM'
            options={{ rules: [{ required: true, min: 3, max: 30 }] }}
            input={
              <Input placeholder={i18n.t('label.why')} onChangeText={accountXM => setFieldsValue({ accountXM })} />
            }
          />
        }

        <FormItem regular
          form={form}
          keyForm='email'
          options={{ rules: [{ required: true }] }}
          input={
            <Input type="email" placeholder={i18n.t('label.email')} onChangeText={email => setFieldsValue({ email })} />
          }
        />

        <FormItem regular
          form={form}
          keyForm='password'
          options={{ rules: [{ required: true, min: 3, max: 30 }] }}
          input={
            <Input secureTextEntry placeholder={i18n.t('label.password')} onChangeText={password => setFieldsValue({ password })} />
          }
        />

        <FormItem regular
          form={form}
          keyForm='repitPassword'
          options={{
            rules: [{
              required: true,
              min: 3, max: 30,
              validator: () => getFieldValue('repitPassword') === getFieldValue('password')
            }]
          }}
          input={
            <Input secureTextEntry placeholder={i18n.t('label.repitPassword')} onChangeText={repitPassword => setFieldsValue({ repitPassword })} />
          }
        />

        <Item error={getFieldError('terms') !== undefined}>
          <Text>{i18n.t('label.terms')}</Text>
          {getFieldDecorator('terms', { rules: [{ required: true, validator: () => getFieldValue('terms') === true }] })(
            <CheckBox checked={isTerms} onPress={onTermsChange} />
          )}
          {getFieldError('terms') && <Icon name='close-circle' />}
        </Item>

        {isFormError && <Text>{i18n.t('error.login.required')}</Text>}
        {error.login && !isFormError && <Text>{i18n.t('error.login.' + error.login)}</Text>}

        <Button success onPress={submit}>
          {loading && <Spinner color='green' />}
          <Text>{i18n.t('button.signup')}</Text>
        </Button>

        <Link to={'/'} underlayColor="#f0f4f7">
          <Text>¡{i18n.t('button.login')}!</Text>
        </Link>

      </Content>
    </Container>
  )
}

export default createForm()(Signup)