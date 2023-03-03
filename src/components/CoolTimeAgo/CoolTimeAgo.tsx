import TimeAgo from 'react-timeago';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ruStrings from 'react-timeago/lib/language-strings/ru';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

export const CoolTimeAgo = ({
  date,
}: {
  date: string | number | Date | null;
}) => {
  if (!date) return <>–</>;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
  const formatter = buildFormatter(ruStrings);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return <TimeAgo date={new Date(date)} formatter={formatter} live />;
};
