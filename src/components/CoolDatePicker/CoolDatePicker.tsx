import { DatePicker } from '@mantine/dates';
import React from 'react';
import 'dayjs/locale/ru';
import useStyles from './CoolDatePicker.styles';

export const CoolDatePicker = (props: {
  label: string;
  value?: Date | null;
  onChange: (value: Date | null) => void;
}) => {
  const { classes } = useStyles();

  return (
    <DatePicker
      label={props.label}
      value={props.value}
      onChange={props.onChange}
      classNames={classes}
      locale="ru"
      placeholder="Выберите дату"
    />
  );
};
