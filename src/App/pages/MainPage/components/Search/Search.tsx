import React from 'react';
import { Input, Button } from 'components';
import styles from './Search.module.scss';

const Search: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (newValue: string) => {
    setSearchValue(newValue);
  };

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <Input
          className={styles.input}
          value={searchValue}
          placeholder="Search product"
          onChange={handleChange}
        ></Input>
        <Button className={styles.searchButton}>Find now</Button>
      </div>
    </div>
  );
};

export default Search;
