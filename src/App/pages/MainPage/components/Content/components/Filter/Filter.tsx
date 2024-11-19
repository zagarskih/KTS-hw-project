import React, { useEffect, useMemo } from 'react';
import MultiDropdown, { MultiDropdownOption } from 'components/MultiDropdown';
import rootStore from 'stores/instance';
import { observer } from 'mobx-react-lite';
import { mapCategoryToOption, getTitle } from 'utils/dropdownUtils';

type FilterProps = {
  onChange: (value: number[]) => void;
  value: number[];
};

const Filter: React.FC<FilterProps> = observer((props) => {
  const { categoriesStore } = rootStore;
  const { categories, fetchCategories } = categoriesStore;

  useEffect(() => {
    if (!categories) {
      fetchCategories();
    }
  }, [categories, fetchCategories]);

  const options = useMemo(
    () => categories?.filter((c) => c.name.toLowerCase() !== 'new category').map(mapCategoryToOption) ?? [],
    [categories],
  );

  const selectedOptions = useMemo(() => {
    const categoriesMap = new Map(categories?.map((c) => [c.id, c]));
    return props.value
      .map((id) => categoriesMap.get(id))
      .filter((o) => o !== undefined)
      .map(mapCategoryToOption);
  }, [props.value, categories]);

  const handleChange = (value: MultiDropdownOption<number>[]) => props.onChange(value.map((v) => v.key));

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
