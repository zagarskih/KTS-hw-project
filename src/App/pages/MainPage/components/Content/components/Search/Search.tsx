import React from 'react';
import { Input, Button } from 'components';
import ClearIcon from 'assets/icons/ClearIcon';
import styles from './Search.module.scss';

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
};

const Search: React.FC<SearchInputProps> = ({ value, onChange, onClear }) => {
  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <Input
          className={styles.input}
          value={value}
          placeholder="Search product"
          onChange={onChange}
          afterSlot={<ClearIcon className={styles.clearIcon} onClick={onClear} />}
        ></Input>
        <Button type="submit" className={styles.searchButton}>
          Find now
        </Button>
      </div>
    </div>
  );
};

export default Search;
