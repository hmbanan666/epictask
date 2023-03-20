import Image from 'next/image';

export const Logo = () => (
  <Image
    src="/epic-logo.svg"
    alt="Логотип веб-сайта Epic Task"
    width={60}
    height={60}
    style={{ padding: 10 }}
  />
);
