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
import dayjs from "dayjs";
import CustomDateTimePicker from "../dashboard/custom-date-time-picker";
import CancelIcon from "@mui/icons-material/Cancel";
import userAPI from "../../shared/services/api/user";
import { useQuery } from "@tanstack/react-query";
import { eventSchema } from "../../shared/validation/schema";
import useAppStore from "../../store/app.store";
import eventAPI from "../../shared/services/api/event";
import locationAPI from "../../shared/services/api/location";

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

const fetchData = async () => { 

  const prom = await Promise.all([
    userAPI.findGuests(),
    locationAPI.find()
  ]);

  return {
    guests: prom[0].data,
    locations: prom[1].data,
  }

};

const EventForm = () => {
  const { setSnackbar } = useAppStore(state=>state);
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["guests"],
    queryFn: fetchData
  });

  const [open, setOpen] = useState(false);


  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: "dsssssss",
      description: "sdfsfsf",
      startTime: dayjs(),
      endTime: dayjs(),
      location: "gbgjdjgjdj",
      guests: [],
    },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = async (data) => {
    const validation = eventSchema.validate({
      ...data,
      guests: data.guests.map((g)=>(g._id)),
      startTime: new Date(data.startTime).toISOString(),
      endTime: new Date(data.endTime).toISOString(),
    });
    if (validation.error) {
      console.error(validation);
      setSnackbar(validation.error)
      return;
    }
    console.log(validation);
    await eventAPI.create(validation.value)
    reset();
    handleClose();
  };



  return (
    <>
      <Button
        variant="contained"
        color="primary"
        size="small"
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
          <FormControl
            fullWidth
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography variant="h6" gutterBottom>
              Create Event
            </Typography>
            <Grid2 container spacing={3}>
              <Grid2 item size={{ xs: 12 }}>
                <TextField
                  // required
                  error={errors?.name?.message && true}
                  id="name"
                  name="name"
                  label="Event Name"
                  size="small"
                  helperText={errors?.name?.message}
                  fullWidth
                  {...register("name")}
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
              <Grid2 item size={{ xs: 12, sm: 6 }} sx={{ position: "relative" }}>
                {/* <TextField
                  // required
                  error={errors?.location?.message && true}
                  id="location"
                  name="location"
                  label="Location"
                  size="small"
                  helperText={errors?.location?.message}
                  fullWidth
                  {...register("location")}
                /> */}
                <InputLabel id="demo-select-small-label">Location</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    error={errors?.location?.message && true}
                    helperText={errors?.location?.message}
                    label="location"
                    name="location"
                    size="small"
                    fullWidth
                    {...register("location")}
                  >
                    {data?.locations?.map((loc) => (
                        <MenuItem key={loc._id} value={loc}>
                          {loc.venueName +","+loc.city}
                        </MenuItem>
                      ))}
                  </Select>

              </Grid2>
              <Grid2 item size={{ xs: 12, sm: 6 }} sx={{ position: "relative" }} fullWidth>
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
                      error={errors?.guests?.message && true}
                      size="small"
                      labelId="guests-label"
                      id="guests"
                      input={<OutlinedInput label="Multiple Guests" />}
                      renderValue={(selected) => (
                        <Stack gap={1} direction="row" flexWrap="wrap">
                          {selected.map((item) => (
                            <Chip
                              key={item._id}
                              label={item.firstName + " " + item.lastName}
                              onDelete={() => {
                                const newValue = field.value.filter(
                                  (v) => v._id !== item._id
                                );
                                field.onChange(newValue);
                              }}
                              deleteIcon={
                                <CancelIcon
                                  onMouseDown={(event) =>
                                    event.stopPropagation()
                                  }
                                />
                              }
                            />
                          ))}
                        </Stack>
                      )}
                    >
                      {data?.guests?.map((guest) => (
                        <MenuItem key={guest._id} value={guest}>
                          {guest.firstName + " " + guest.lastName}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                
                <Typography component="small" variant="p" color="error.main">
                  {errors?.guests?.message}
                </Typography>
                <Typography component="small" variant="p" color="error.main">
                    {data?.guests?.length === 0 && "No guests" }
                </Typography>
              </Grid2>

              <Grid2 item size={{ xs: 12, sm: 6 }}>
                <CustomDateTimePicker
                  control={control}
                  errors={errors}
                  name="startTime"
                  label="Start Date Time"
                />
              </Grid2>
              <Grid2 item size={{ xs: 12, sm: 6 }}>
                <CustomDateTimePicker
                  control={control}
                  errors={errors}
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
