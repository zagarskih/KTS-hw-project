import React from 'react';
import { Input, Button } from 'components';
import styles from './Search.module.scss';

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void; // Обновляем тип функции onChange
};

const Search: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <Input
          className={styles.input}
          value={value}
          placeholder="Search product"
          onChange={(newValue) => onChange(newValue)}
        ></Input>
        <Button className={styles.searchButton}>Find now</Button>
      </div>
    </div>
  );
};

export default Search;
