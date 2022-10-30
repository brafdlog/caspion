import styles from './AccountLogs.css';
import { Log } from '../../types';

type AccountLogsProps = {
    logs: Log[]
}

export default function AccountLogs({ logs }: AccountLogsProps) {
    return (
        <div className={styles.container}>
            {logs.map((log, index) => <p key={index}>{log.message}</p> )}
        </div>
    );
}