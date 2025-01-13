import { useState } from "react";
import {
  TextField,
  Button,
  Grid2,
  Typography,
  FormControl,
  Box,
  Modal,
  Select,
  MenuItem,
  OutlinedInput,
  InputLabel,
  Chip,
  Stack,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import dayjs from "dayjs";
import CustomDateTimePicker from "../dashboard/custom-date-time-picker";
import CancelIcon from "@mui/icons-material/Cancel";
import userAPI from "../../shared/services/api/user";
import { useQuery } from "@tanstack/react-query";
import { eventSchema } from "../../shared/validation/schema";




const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "100%", md: 700 },
  bgcolor: "background.paper",
  boxShadow: 0,
  p: 4,
};


const fetchGuests = async () => {
  return await userAPI.findGuests();
};


const EventForm = () => {
  const { isLoading, isError, error, data } = useQuery({ queryKey: ['guests'], queryFn: fetchGuests });
  const [open, setOpen] = useState(false);
  const guests = data?.data;

  // const [data, setData] = useState([]);
  const { control, register, reset, handleSubmit, formState: { errors} } = useForm({
    defaultValues: {
      eventName: "",
      description: "",
      startTime: dayjs(),
      endTime: dayjs(),
      location: "",
      guests: []
    },
    resolver: joiResolver(eventSchema)
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = (data) => {
    console.log(data);
    reset();
    handleClose();
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleOpen}
      >
        Add Event
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add event form"
        aria-describedby="add event form"
      >
        <Box sx={style}>
          <FormControl fullWidth component="form" onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h6" gutterBottom>
              Create Event
            </Typography>
              <Grid2 container spacing={3}>
                <Grid2 item size={{ xs: 12 }}>
                  <TextField
                    // required
                    error={errors?.eventName?.message && true}
                    id="eventName"
                    name="eventName"
                    label="Event Name"
                    size="small"
                    helperText={errors?.eventName?.message}
                    fullWidth
                    {...register("eventName")}
                  />
                </Grid2>
                <Grid2 item size={{ xs: 12 }}>
                  <TextField
                    // required
                    error={errors?.description?.message && true}
                    id="description"
                    name="description"
                    label="Description"
                    size="small"
                    helperText={errors?.description?.message}
                    multiline
                    fullWidth
                    maxRows={6}
                    minRows={6}
                    {...register("description")}
                  />
                </Grid2>
                <Grid2 item size={{ xs: 12, sm: 6 }}>
                  <TextField
                    // required
                    id="location"
                    name="location"
                    label="Location"
                    size="small"
                    fullWidth
                    {...register("location")}
                  />
                </Grid2>
                <Grid2 item size={{ xs: 12, sm: 6 }} fullWidth>
                  <InputLabel>Guests</InputLabel>
                  <Controller
                    name="guests"
                    control={control}
                    defaultValue={[]}
                    render={({ field }) => (
                      <Select
                        {...field}
                        multiple
                        fullWidth
                        size="small"
                        labelId="guests-label"
                        id="guests"
                        input={<OutlinedInput label="Multiple Guests" />}
                        renderValue={(selected) => (
                          <Stack gap={1} direction="row" flexWrap="wrap">
                            {selected.map((value) => (
                              <Chip
                                key={value}
                                label={value}
                                onDelete={() => {
                                  const newValue = field.value.filter(
                                    (item) => item !== value
                                  );
                                  field.onChange(newValue);
                                }}
                                deleteIcon={<CancelIcon
                                    onMouseDown={(event) => event.stopPropagation()}
                                  />}
                              />
                            ))}
                          </Stack>
                        )}
                      >
                        {guests?.map((guest)=><MenuItem key={guest._id} value={guest.firstName}>{guest.firstName+ " "+guest.lastName }</MenuItem>)}
                      </Select>
                    )}
                  />
                </Grid2>
                <Grid2 item size={{ xs: 12, sm: 6 }}>
                  <CustomDateTimePicker
                    control={control}
                    name="startTime"
                    label="Start Date Time"
                  />
                </Grid2>
                <Grid2 item size={{ xs: 12, sm: 6 }}>
                  <CustomDateTimePicker
                    control={control}
                    name="endTime"
                    label="End Date Time"
                  />
                </Grid2>
              </Grid2>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Create Event
                </Button>
          </FormControl>
        </Box>
      </Modal>
    </>
  );
};

export default EventForm;
