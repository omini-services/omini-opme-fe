import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  TextField,
} from '@mui/material';
import React, { SyntheticEvent } from 'react';

export interface ICustomAutoComplete {
  options: Array<object>;
  getOptionLabel: (option: object) => string;
  value: object;
  onChange: (
    event: SyntheticEvent<Element, Event>,
    value: object | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<object> | undefined,
  ) => void;
  label: string;
  name: string;
  restProps: any;
}

export const CustomAutoComplete = ({
  options,
  getOptionLabel,
  value,
  onChange,
  label,
  name,
  ...restProps
}: ICustomAutoComplete) => (
  <Autocomplete
    options={options}
    getOptionLabel={getOptionLabel}
    value={value}
    onChange={(event, newValue) =>
      onChange({ ...{ ...event, target: { ...event.target, name } } }, newValue)
    }
    renderInput={(params) => (
      <TextField
        {...params}
        label={label}
        fullWidth
        margin="normal"
        name={name}
      />
    )}
    {...restProps}
  />
);

export default CustomAutoComplete;
