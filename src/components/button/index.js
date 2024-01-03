import './button.css'

const Button = ({title, framed, right, click, loading}) => (
    !loading && <button className={`${right && "float-right"} ${framed && "framed mr-0"}`} onClick={click}>{title}</button>
);

export default Button;
