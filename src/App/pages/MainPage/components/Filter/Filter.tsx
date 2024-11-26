import React, { useState } from 'react';
import MultiDropdown from './components/MultiDropdown';
import { getCategories } from 'api/index';
import { useQuery } from '@tanstack/react-query';
import { CategoryApi } from 'api/types';

type Option = {
  key: string;
  value: string;
};

const Filter: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const { data } = useQuery<CategoryApi[] | null>({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const options =
    data &&
    data.reduce<Option[]>((acc, category) => {
      acc.push({ key: category.id.toString(), value: category.name });
      return acc;
    }, []);

  const handleChange = (value: Option[]) => {
    setSelectedOptions(value);
  };

  const getTitle = (value: Option[]) => {
    return value.length ? value.map((option) => option.value).join(', ') : 'Filter';
  };

  return (
    <MultiDropdown
      options={options ? options : []}
      value={selectedOptions}
      onChange={handleChange}
      getTitle={getTitle}
    ></MultiDropdown>
  );
};

export default Filter;
