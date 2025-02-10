import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Controller } from "react-hook-form";

function ButtonField(props) {
  const {
    setOpen,
    label,
    id,
    disabled,
    InputProps: { ref } = {},
    inputProps: { "aria-label": ariaLabel } = {},
  } = props;

  return (
    <Button
      variant="outlined"
      id={id}
      disabled={disabled}
      ref={ref}
      aria-label={ariaLabel}
      size="small"
      onClick={() => setOpen?.((prev) => !prev)}
      startIcon={<CalendarTodayRoundedIcon fontSize="small" />}
      sx={{ minWidth: "fit-content" }}
    >
      {label ? `${label}` : "Pick a date"}
    </Button>
  );
}

ButtonField.propTypes = {
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  id: PropTypes.string,
  inputProps: PropTypes.shape({
    "aria-label": PropTypes.string,
  }),
  InputProps: PropTypes.shape({
    endAdornment: PropTypes.node,
    startAdornment: PropTypes.node,
  }),
  label: PropTypes.node,
  setOpen: PropTypes.func,
};

export default function CustomDateTimePicker({ label, name, control, errors }) {
  return (
    <Controller
      label={label}
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]} sx={{ pt: 1 }}>
              <DateTimePicker
                {...field}
                size="small"
                // format="MM/DD/YYYY HH:mm"
                // views={['month', 'day', 'year', 'hours', 'minutes']}
                // renderInput={(props) => <input {...props} />}
                //   slots={{ field: ButtonField }}
                //   slotProps={{
                //     field: { setOpen },
                //     nextIconButton: { size: "small" },
                //     previousIconButton: { size: "small" },
                //   }}
                //   open={open}
                //   onClose={() => setOpen(false)}
                //   onOpen={() => setOpen(true)}
              />
            </DemoContainer>
          </LocalizationProvider>
        );
      }}
    />
  );
}
