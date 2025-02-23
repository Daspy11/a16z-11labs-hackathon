import Image from 'next/image';

export const Logo = ({
  className,
  width = 130,
  height = 16,
}: {
  className: string;
  width?: number;
  height?: number;
}) => (
  <Image
    src="/logo.png"
    alt="Espresso Labs Logo"
    width={width}
    height={height}
    className={className}
    priority
  />
);
