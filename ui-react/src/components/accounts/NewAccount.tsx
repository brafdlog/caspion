import styles from './NewAccount.module.css';
import plusCircle from '../../assets/plus-circle.svg';

type NewAccountProps = {
  onClick: () => void
}

export default function NewAccount({
  onClick
}: NewAccountProps) {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.nameWrapper}>
        <div className={styles.name}>חשבון חדש</div>
      </div>
      <img className={styles.image} src={plusCircle} alt={'חשבון חדש'} height={18} width={18} />
    </div>
  );
}
