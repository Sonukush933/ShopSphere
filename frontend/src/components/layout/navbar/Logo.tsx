import { useNavigate } from "react-router-dom";

type LogoProps = {
  mobile?: boolean;
};

function Logo({ mobile = false }: LogoProps) {
  const navigate = useNavigate();

  return (
    <img
      src="https://res.cloudinary.com/bng3qsqr/image/upload/v1783574092/ShopSphere-logo_pprfh0.png"
      alt="ShopSphere"
      onClick={() => navigate("/")}
      className={`
        w-auto
        object-contain
        cursor-pointer
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