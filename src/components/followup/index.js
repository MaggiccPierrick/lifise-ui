import './followup.css'

const FollowUp = ({intro, description, link}) => (
    link?
    <span className="followup">{intro} <a href={link}>{description}</a></span>
    :
    <span className="followup">{intro}</span>
);

export default FollowUp;
