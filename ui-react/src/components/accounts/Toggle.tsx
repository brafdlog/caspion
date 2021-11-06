import toggleOn from '../../assets/toggle-on.svg';
import toggleOff from '../../assets/toggle-off.svg';

type ToggleProps = {
    on: boolean;
    onChange: () => void
}

export default function Toggle({ on, onChange }: ToggleProps) {
    const icon = on ? toggleOn : toggleOff;
    const altText = on ? 'Active' : 'Not active';
    return <img src={icon} onClick={onChange} height={35} width={35} alt={altText}/>;
}