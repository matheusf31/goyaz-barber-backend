import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useField } from '@unform/core';

import { Container, TInput } from './styles';

function Input({ style, name, icon, ...rest }, ref) {
  const inputElementRef = useRef(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    if (inputValueRef.current.value) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      // para o Form alterar o valor de um campo automaticamente
      setValue(ref, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.value.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container style={style} isFocused={isFocused} isErrored={error}>
      {icon && (
        <Icon
          name={icon}
          size={20}
          color={isFocused || isFilled ? '#ff9000' : '#FFF'}
        />
      )}
      <TInput
        ref={inputElementRef}
        keyboardAppearance="dark"
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChangeText={value => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
}

export default forwardRef(Input);
