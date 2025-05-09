import styleBtn from "./style.module.scss";

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    isLoading?: boolean | undefined;
};

const Button = ({ children, onClick, type = "button", isLoading }: ButtonProps) => {
    return (
        <button type={type} onClick={onClick} className={styleBtn["submit-btn"]} disabled={isLoading}>
            {children}
        </button>
    );
};

export default Button;
