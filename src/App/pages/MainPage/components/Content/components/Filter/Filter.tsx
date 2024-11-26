import React, { useEffect, useMemo } from 'react';
import MultiDropdown, { MultiDropdownOption } from './components/MultiDropdown';
import rootStore from 'stores/instanse';
import { observer } from 'mobx-react-lite';
import { CategoryApi } from 'api/types';

type FilterProps = {
  onChange: (value: number[]) => void;
  value: number[];
};

const mapCategoryToOption = (c: CategoryApi): MultiDropdownOption<number> => ({
  key: c.id,
  value: c.name,
});

const Filter: React.FC<FilterProps> = observer((props) => {
  const { categoriesStore } = rootStore;
  const { categories, fetchCategories } = categoriesStore;

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const categoriesMap = useMemo(
    () => new Map(categories?.map((c) => [c.id, c])),
    [categories],
  );

  const options = useMemo(
    () => categories?.map(mapCategoryToOption) ?? [],
    [categories],
  );

  const selectedOptions = useMemo(
    () =>
      props.value
        .map((id) => categoriesMap.get(id))
        .filter((o) => o !== undefined)
        .map(mapCategoryToOption),
    [props.value, categoriesMap],
  );

  const handleChange = (value: MultiDropdownOption<number>[]) =>
    props.onChange(value.map((v) => v.key));

  const getTitle = (value: MultiDropdownOption<number>[]) => {
    return value.length
      ? value.map((option) => option.value).join(', ')
      : 'Filter';
  };

  return (
    <MultiDropdown
      options={options}
      value={selectedOptions}
      onChange={handleChange}
      getTitle={getTitle}
      mode="single"
    />
  );
});

export default Filter;
