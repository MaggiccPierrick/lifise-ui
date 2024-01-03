import './followup.css'

const FollowUp = ({ intro, description, link, action }) => (
    link ?
        <span className="followup">{intro} <a href={link}>{description}</a></span>
        :
        action ?
            <span className="followup">{intro} <a href={"#action"} onClick={action}>{description}</a></span>
            :
            <span className="followup">{intro}</span>
);

export default FollowUp;
