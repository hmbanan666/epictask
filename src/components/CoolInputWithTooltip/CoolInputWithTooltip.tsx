import React from 'react';
import {
  Box,
  Collapse,
  MultiSelect,
  Select,
  Textarea,
  TextInput,
} from '@mantine/core';
import { TimeRangeInput } from '@mantine/dates';
import type { SelectItem } from '@mantine/core/lib/Select/types';
import { IconClock } from '@tabler/icons-react';
import useStyles from './CoolInputWithTooltip.styles';

function TooltipBlock(props: {
  opened: boolean;
  tooltip: JSX.Element | string | undefined;
  inputLength: number;
  maxLength?: number;
}) {
  const { classes } = useStyles();

  if (!props.tooltip && !props.maxLength) return null;

  return (
    <Collapse in={props.opened}>
      <Box className={classes.tooltip}>
        {props.maxLength && (
          <Box className={classes.tooltipInputLength}>
            {props.inputLength} / {props.maxLength} символов
          </Box>
        )}
        <Box>{props.tooltip}</Box>
      </Box>
    </Collapse>
  );
}

export function CoolInputWithTooltip(props: {
  label: string;
  type?: 'input' | 'textarea' | 'select' | 'multiSelect' | 'timeRange';
  value?: string | number;
  placeholder?: string;
  selectData?: SelectItem[];
  selectValue?: string[];
  timeData?: [Date, Date];
  required?: boolean;
  maxLength?: number;
  onChange?: (value: string) => void;
  onChangeMultiSelect?: (value: string[]) => void;
  children?: JSX.Element | string;
}) {
  const { classes } = useStyles();
  const [inputValue, setInputValue] = React.useState<string>(
    props?.value?.toString() || ''
  );
  const [multiselectValue, setMultiselectValue] = React.useState<string[]>(
    props?.selectValue || []
  );
  const [isFocused, setIsFocused] = React.useState<boolean>(false);
  const [length, setLength] = React.useState<number>(
    props?.value?.toString().length || 0
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setInputValue(event.target.value);
    setLength(event.target.value.length);
    if (props?.onChange) props.onChange(event.target.value);
  };

  const handleSelect = (value: string) => {
    setInputValue(value);
    if (props?.onChange) props.onChange(value);
  };

  const handleMultiSelect = (value: string[]) => {
    setMultiselectValue(value);
    if (props?.onChangeMultiSelect) props.onChangeMultiSelect(value);
  };

  const type = props.type || 'input';

  return (
    <>
      <TooltipBlock
        opened={isFocused}
        tooltip={props.children}
        inputLength={length}
        maxLength={props.maxLength}
      />
      {type === 'input' && (
        <TextInput
          label={props.label}
          placeholder={props.placeholder}
          required={props.required}
          classNames={classes}
          value={inputValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          maxLength={props.maxLength}
          autoComplete="off"
        />
      )}
      {type === 'textarea' && (
        <Textarea
          label={props.label}
          placeholder={props.placeholder}
          required={props.required}
          classNames={classes}
          value={inputValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          maxLength={props.maxLength}
          autoComplete="off"
          autosize
        />
      )}
      {type === 'select' && props.selectData && (
        <Select
          label={props.label}
          required={props.required}
          classNames={classes}
          value={inputValue}
          data={props.selectData}
          onChange={handleSelect}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      )}
      {type === 'multiSelect' && props.selectData && (
        <MultiSelect
          label={props.label}
          classNames={classes}
          placeholder={props.placeholder}
          data={props.selectData}
          value={multiselectValue}
          onChange={handleMultiSelect}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          styles={{
            values: {
              paddingTop: 5,
              paddingBottom: 5,
            },
          }}
        />
      )}
      {type === 'timeRange' && (
        <TimeRangeInput
          label={props.label}
          value={props.timeData}
          classNames={classes}
          icon={<IconClock size={16} />}
          size="md"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      )}
    </>
  );
}
