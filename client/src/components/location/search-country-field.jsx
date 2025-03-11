import { Autocomplete, Box, Chip, Stack, TextField, Typography } from "@mui/material";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { Controller } from "react-hook-form";

const SearchLocationField = ({ label, error, locations, control }) => {
  return (
    <Controller
      control={control}
      name="country"
      render={({ field }) => (
        <Autocomplete
          {...field}
          size="small"
          options={locations}
          autoHighlight
          getOptionLabel={(option) => option.name}
          onChange={(e, value) => field.onChange(value)} // Ensure form value updates on selection
          renderOption={(props, option) => (
            <Box
              key={option.isoCode} // Adjust with your option's unique identifier
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <img
                loading="lazy"
                width="20"
                srcSet={`https://flagcdn.com/w40/${option.isoCode.toLowerCase()}.png 2x`}
                src={`https://flagcdn.com/w20/${option.isoCode.toLowerCase()}.png`}
                alt=""
              />

              <Stack spacing={2} direction="row">
                <Typography component="p" variant="p">{option.name} ({option.isoCode})</Typography>
                <Chip icon={<LocalPhoneIcon />} label={option.phonecode} />
              </Stack>

            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={error.country && Boolean(error.country?.message)}
              helperText={error.country && error.country?.message}
            />
          )}
        />
      )}
    />
  );
};

export default SearchLocationField;
