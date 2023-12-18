import './followup.css'

const FollowUp = ({intro, description, link}) => (
    <span className="followup">{intro} <a href={link}>{description}</a></span>
);

export default FollowUp;
