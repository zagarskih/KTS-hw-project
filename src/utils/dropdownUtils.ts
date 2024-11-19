import { MultiDropdownOption } from 'components/MultiDropdown';
import { CategoryApi } from 'api/types';

export const mapCategoryToOption = (category: CategoryApi): MultiDropdownOption<number> => ({
  key: category.id,
  value: category.name,
});

export const getTitle = (value: MultiDropdownOption<number>[]): string => {
  return value.length ? value.map((option) => option.value).join(', ') : 'Filter';
};
