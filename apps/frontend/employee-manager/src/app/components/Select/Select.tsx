import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
  ChangeEvent,
  useCallback,
} from 'react';
import { Form, FormSelectProps } from 'react-bootstrap';

import classes from './Select.module.less';
import IconButton from '../IconButton/IconButton';
import { IoClose } from 'react-icons/io5';

type SelectType = Omit<FormSelectProps, 'id' | 'value'> & {
  id: string;
  value?: string;
  label?: string;
  feedback?: string;
  options: { label: string; value: string }[];
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  onHandleChange?: (id: string, value: string) => string;
};

export type Ref = {
  value: string;
  clear: () => void;
  setValidation: (val: string) => void;
};

const Select: ForwardRefRenderFunction<Ref, SelectType> = (
  {
    id,
    label,
    options,
    required,
    value,
    feedback,
    disabled,
    placeholder,
    onHandleChange,
    ...rest
  },
  ref
) => {
  const [selectValue, setSelectValue] = useState<string>(value || '');
  const [selectFeedBack, setSelectFeedBack] = useState<string>(feedback || '');
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(event.target.value);
  }, []);
  useEffect(() => {
    if (onHandleChange) {
      const validationMsg = onHandleChange(id, selectValue);
      setSelectFeedBack(validationMsg);
    } else {
      setSelectFeedBack('');
    }
  }, [selectValue]);

  useEffect(() => {
    if (feedback !== undefined) {
      setSelectFeedBack(feedback);
    } else if (selectFeedBack.trim() !== '') {
      setSelectFeedBack('');
    }
  }, [feedback]);
  const handleValidation = useCallback((val: string) => {
    setSelectFeedBack(val);
  }, []);
  useImperativeHandle(ref, () => ({
    value: selectValue,
    clear: () => setSelectValue(''),
    setValidation: handleValidation,
  }));

  return (
    <Form.Group className="mb-3" controlId={id}>
      {label && (
        <Form.Label className={classes.label}>
          {label} {required && <span className="text-danger fw-bold">*</span>}
        </Form.Label>
      )}
      <div className={classes.selectContainer}>
        <Form.Select
          ref={selectRef}
          value={selectValue}
          onChange={handleChange}
          aria-label={label || id}
          isInvalid={selectFeedBack !== ''}
          disabled={disabled}
          className={
            selectValue
              ? `${classes.select} ${classes.selectValue}`
              : classes.select
          }
          {...rest}
        >
          {placeholder && (
            <option className="text-muted" value="">
              {placeholder}
            </option>
          )}
          {options.map(({ label, value }: { label: string; value: string }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {selectFeedBack}
        </Form.Control.Feedback>
        <div className={classes.actionContainer}>
          {!!selectValue && !disabled && (
            <IconButton
              disabledFocusOnTab
              onClick={() => setSelectValue('')}
              className={`${classes.btnClose} ${
                selectFeedBack ? classes.btnInvalid : undefined
              } `}
            >
              <IoClose size="1.3rem" />
            </IconButton>
          )}
        </div>
      </div>
    </Form.Group>
  );
};

export default forwardRef<Ref, SelectType>(Select);
