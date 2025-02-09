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
  Tooltip,
  IconButton,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";
import CustomDateTimePicker from "../dashboard/custom-date-time-picker";
import CancelIcon from "@mui/icons-material/Cancel";
import CachedIcon from "@mui/icons-material/Cached";
import AddIcon from "@mui/icons-material/Add";
import eventAPI from "../../shared/services/api/event";
import { useQuery } from "@tanstack/react-query";
import { eventSchema } from "../../shared/validation/schema";
import useAppStore from "../../store/app.store";
import { queryClient } from "../../providers/query-provider";
import { fetchEventsData } from "../../shared/utils";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "100%", md: 800 },
  bgcolor: "background.paper",
  boxShadow: 0,
  p: 4,
};


const EventForm = () => {
  const { setSnackbar } = useAppStore((state) => state);
  const { data } = useQuery({
    queryKey: ["event-data"],
    queryFn: fetchEventsData,
  });

  const [open, setOpen] = useState(false);

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      startTime: dayjs(),
      endTime: dayjs().add(2, "hour"),
      location: "",
      category: "",
      guests: [],
    },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = async (data) => {
    const validation = eventSchema.validate({
      ...data,
      startTime: new Date(data.startTime).toISOString(),
      endTime: new Date(data.endTime).toISOString(),
    });
    if (validation.error) {
      console.error(validation);
      setSnackbar(validation.error);
      return;
    }
    const res = await eventAPI.create(validation.value);
    if (res.status === 201) {
      queryClient.invalidateQueries("events");
    }
    reset();
    handleClose();
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleOpen}
        >
          <AddIcon />
          Add Event
        </Button>
        <Tooltip title="Refetch">
          <IconButton
            size="small"
            color="primary"
            onClick={async () => {
              queryClient.invalidateQueries("events");
            }}
          >
            <CachedIcon />
          </IconButton>
        </Tooltip>
      </Box>

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
              <Grid2
                item
                size={{ xs: 12, md: 4 }}
                sx={{ position: "relative" }}
              >
                <InputLabel id="demo-select-small-label">Category</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  error={errors?.category?.message && true}
                  helperText={errors?.category?.message}
                  defaultValue=""
                  size="small"
                  fullWidth
                  {...register("category")}
                >
                  {data?.categories?.map((cat) => (
                    <MenuItem key={cat._id} value={cat?._id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
                <Typography component="small" variant="p" color="error.main">
                  {data?.categories?.length === 0 && "No categories"}
                </Typography>
              </Grid2>
              <Grid2
                item
                size={{ xs: 12, md: 4 }}
                sx={{ position: "relative" }}
              >
                <InputLabel id="demo-select-small-label">Location</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  error={errors?.location?.message && true}
                  helperText={errors?.location?.message}
                  defaultValue=""
                  size="small"
                  fullWidth
                  {...register("location")}
                >
                  {data?.locations?.map((loc) => (
                    <MenuItem key={loc._id} value={loc?._id}>
                      {loc.venueName + "," + loc.city}
                    </MenuItem>
                  ))}
                </Select>
                <Typography component="small" variant="p" color="error.main">
                  {data?.locations?.length === 0 && "No locations"}
                </Typography>
              </Grid2>
              <Grid2
                item
                size={{ xs: 12, md: 4 }}
                sx={{ position: "relative" }}
                fullWidth
              >
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
                          {selected.map((value) => {
                            const item = data?.guestsKeys[value];
                            return (
                              <Chip
                                key={value}
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
                            );
                          })}
                        </Stack>
                      )}
                    >
                      {data?.guests?.map((guest) => (
                        <MenuItem key={guest._id} value={guest._id}>
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
                  {data?.guests?.length === 0 && "No guests"}
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
