import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
  useCallback,
} from 'react';
import { Form, FormControlProps } from 'react-bootstrap';

import classes from './Input.module.less';
import IconButton from '../IconButton/IconButton';
import { IoClose } from 'react-icons/io5';
import { useDebounce } from '../../helper/general';
type InputType = Omit<FormControlProps, 'id' | 'type' | 'as' | 'value'> & {
  id: string;
  min?: number;
  max?: number;
  value?: string;
  label?: string;
  feedback?: string;
  required?: boolean;
  disabled?: boolean;
  type?: 'email' | 'text' | 'number' | 'date';
  onHandleChange?: (id: string, value: string) => string;
};

export type Ref = {
  value: string;
  clear: () => void;
  setValidation: (val: string) => void;
};

const Input: ForwardRefRenderFunction<Ref, InputType> = (
  {
    id,
    label,
    required,
    value,
    type,
    feedback,
    min,
    max,
    disabled,
    onHandleChange,
    ...rest
  },
  ref
) => {
  const [inputValue, setInputValue] = useState<string>(value || '');
  const [inputFeedBack, setInputFeedBack] = useState<string>(feedback || '');
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedValue = useDebounce(inputValue, 300);

  useEffect(() => {
    if (onHandleChange) {
      const validationMsg = onHandleChange(id, debouncedValue);
      setInputFeedBack(validationMsg);
    } else {
      setInputFeedBack('');
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (feedback !== undefined) {
      setInputFeedBack(feedback);
    } else if (inputFeedBack.trim() !== '') {
      setInputFeedBack('');
    }
  }, [feedback]);

  const handleValidation = useCallback((val: string) => {
    setInputFeedBack(val);
  }, []);
  useImperativeHandle(ref, () => ({
    value: inputValue,
    clear: () => setInputValue(''),
    setValidation: handleValidation,
  }));

  return (
    <div className={classes.infoContainer}>
      <Form.Group className="mb-3" controlId={id}>
        {label && (
          <Form.Label className={classes.label}>
            {label} {required && <span className="text-danger fw-bold">*</span>}
          </Form.Label>
        )}
        <div className={classes.inputContainer}>
          <Form.Control
            name={id}
            ref={inputRef}
            value={inputValue}
            required={required}
            type={type ?? 'text'}
            onChange={(e) => setInputValue(e.target.value)}
            isInvalid={inputFeedBack !== ''}
            {...(type === 'number' ? { min: min, max: max } : {})}
            disabled={disabled}
            className={
              !!inputValue && !disabled ? classes.formControl : undefined
            }
            {...rest}
          />
          <Form.Control.Feedback type="invalid">
            {inputFeedBack}
          </Form.Control.Feedback>
          <div className={classes.actionContainer}>
            {!!inputValue && !disabled && (
              <IconButton
                disabledFocusOnTab
                onClick={() => setInputValue('')}
                className={`${classes.btnClose} ${
                  inputFeedBack ? classes.btnInvalid : undefined
                } `}
              >
                <IoClose size="1.3rem" />
              </IconButton>
            )}
          </div>
        </div>
      </Form.Group>
    </div>
  );
};

export default forwardRef<Ref, InputType>(Input);
