type LogoProps = {
  mobile?: boolean;
};

function Logo({ mobile = false }: LogoProps) {
  return (
    <img
      src="https://res.cloudinary.com/bng3qsqr/image/upload/v1783574092/ShopSphere-logo_pprfh0.png"
      alt="ShopSphere"
      className={`
        w-auto
        object-contain
        ${
          mobile
            ? "h-[42px]"
            : "h-[66px]"
        }
      `}
    />
  );
}

export default Logo;