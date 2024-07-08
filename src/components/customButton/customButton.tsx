import { ReactNode } from "react";
import Button from "@mui/material/Button";

type CustomButtonProps = {
  children: ReactNode;
  handleClick?: () => void;
  disabled?: boolean;
};

const CustomButton = ({
  children,
  handleClick,
  disabled = false,
}: CustomButtonProps) => {
  return (
    <Button
      variant="contained"
      sx={{
        margin: "20px",
      }}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
