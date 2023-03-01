import Image from 'next/image';

export const Logo = () => (
  <Image
    src="/epic-logo.svg"
    alt=""
    width={60}
    height={60}
    style={{ padding: 10 }}
  />
);
