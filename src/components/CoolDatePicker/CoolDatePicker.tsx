import { DatePickerInput } from '@mantine/dates';
import React from 'react';
import 'dayjs/locale/ru';
import { Box } from '@mantine/core';
import useStyles from './CoolDatePicker.styles';

export const CoolDatePicker = (props: {
  label: string;
  value?: Date | null;
  onChange: (value: Date | null) => void;
}) => {
  const { classes } = useStyles();

  return (
    <Box>
      <DatePickerInput
        label={props.label}
        value={props.value}
        onChange={props.onChange}
        dropdownType="modal"
        classNames={{
          root: classes.root,
          wrapper: classes.wrapper,
          input: classes.input,
          label: classes.label,
        }}
        locale="ru"
        placeholder="Выберите дату"
      />
    </Box>
  );
};
