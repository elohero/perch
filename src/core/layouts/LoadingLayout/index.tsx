import { BounceLoader } from 'react-spinners';
import styles from './styles.module.css';

const LoadingLayout = () => {
  return (
    <main className={ styles.loader }>
      <BounceLoader color={ '#A41C1F' } loading={ true } size={ 50 }/>
    </main>
  );
};

export default LoadingLayout;