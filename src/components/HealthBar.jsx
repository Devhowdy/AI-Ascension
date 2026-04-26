import StatBar from './StatBar';

function HealthBar({ label, value, tone }) {
  return <StatBar label={label} value={value} tone={tone} />;
}

export default HealthBar;
