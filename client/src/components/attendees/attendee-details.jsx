import { useState } from "react";
import {
  Box,
  Chip,
  Divider,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import ticketAPI from "../../shared/services/api/ticket";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../common/spinner";
import AlertCard from "../common/alert-card";
import PeopleIcon from "@mui/icons-material/People";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HistoryIcon from "@mui/icons-material/History";
import ContactsIcon from '@mui/icons-material/Contacts';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import dayjs from "dayjs";
import { formatCurrency } from "../../shared/utils";



const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const AttendeeDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [openHistory, setOpenHistory] = useState(false);
  const [openContact, setOpenContact] = useState(false);

  const fetchAttendee = async () => {
    return await ticketAPI.findByUser(params.id);
  };
  const { isLoading, isError, data } = useQuery({
    queryKey: ["attendee", params.id],
    queryFn: fetchAttendee,
  });

  const attendee = Array.isArray(data?.data) ? data?.data : [{ ...data?.data }];

  const goBack = () => navigate(-1);

  if (isError) {
    return <AlertCard message="Error data fetching" color="error" />;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box
      sx={{
        position: "relative",
        margin: "auto",
        width: "100%",
        // width: { xs: "100%", md: "700px" },
      }}
    >
      <Tooltip title="Back" sx={{ mb: 2 }}>
        <IconButton size="small" color="default" onClick={goBack}>
          <ArrowBackIcon />
        </IconButton>
      </Tooltip>
      <Paper sx={{ p: 2 }} elevation={0}>
        <Typography
          variant="h5"
          component="p"
          color="primary"
          sx={{ fontWeight: 600 }}
        >
          {attendee[0]?.user?.firstName + " " + attendee[0]?.user?.lastName}
        </Typography>
        <Box
          sx={{
            ...style,
            alignItems: { xs: "start", md: "center" },
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Typography component="h4" variant="p" color="text.secondary">
            {attendee[0]?.event?.name}
          </Typography>
          <Stack sx={style} direction="row" spacing={1}>
            <Chip
              icon={<PeopleIcon />}
              label={attendee[0]?.attendees?.length}
            />
          </Stack>
        </Box>

        <Typography component="p" variant="p" color="text.secondary" mb={1}>
          Location: {attendee[0]?.event?.location?.venueName}
        </Typography>

        <Typography
          variant="body"
          component="div"
          color="text.secondary"
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 1,
          }}
        >
          <CalendarMonthIcon sx={{ mr: 1 }} />
          {dayjs(attendee[0]?.date).format("MMM D, YYYY")}
        </Typography>

        <Stack sx={style} direction="row" spacing={1} mb={2}>
          <Chip
            label={
              attendee[0]?.event?.priceInCents > 0
                ? formatCurrency({
                    amount: attendee[0]?.event?.priceInCents / 100,
                  })
                : "Free"
            }
            sx={{
              fontSize: "1.5rem",
              fontWeight: 600,
              bgcolor: "rgb(53, 149, 110)",
              color: "#fff",
              border: "none",
            }}
            variant="outlined"
          />
        </Stack>

        <Typography
          variant="body"
          component="div"
          color="text.secondary"
          mb={1}
        >
          Members: <br />
          {attendee[0]?.attendees?.map((att) => (
            <Typography
              key={att.name}
              variant="body"
              component="div"
              sx={style}
            >
              <Typography component="small">{att.name}</Typography>
              <Typography component="small">
                {att.arrived ? (
                  <CheckCircleIcon fontSize="small" color="success" />
                ) : (
                  ""
                )}
              </Typography>
            </Typography>
          ))}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box>
          <Typography
            variant="body"
            component="div"
            color="text.secondary"
            sx={{ ...style, cursor: "pointer", pb: 2 }}
            onClick={() => setOpenHistory(!openHistory)}
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              <HistoryIcon sx={{ mr: 1 }} />
              Event History
            </span>

            <span>
              <Tooltip>
                <IconButton
                  size="small"
                  color="default"
                  onClick={() => setOpenHistory(!openHistory)}
                >
                  {openHistory ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </Tooltip>
            </span>
          </Typography>

          {openHistory ? (
            attendee.length ? (
              attendee?.map((att) => (
                <Paper
                  key={att._id}
                  sx={{ p: 2, mb: 2, bgcolor: "#f8f8f8" }}
                  elevation={0}
                >
                  <Typography
                    sx={{ display: "flex", justifyContent: "space-between" }}
                    variant="body"
                    component="div"
                  >
                    <span>{att.event.name}</span>
                    <span>
                      {att?.event?.priceInCents
                        ? formatCurrency({ amount: att?.event?.priceInCents })
                        : "Free"}
                    </span>
                  </Typography>
                  <Typography
                    component="p"
                    variant="p"
                    color="text.secondary"
                    mb={1}
                  >
                    {att?.event?.location?.venueName}
                  </Typography>

                  <Typography
                    variant="body"
                    component="div"
                    color="text.secondary"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 1,
                      fontSize: "0.9rem",
                    }}
                  >
                    <CalendarMonthIcon fontSize="small" sx={{ mr: 1 }} />
                    {dayjs(att?.date).format("MMM D, YYYY")}
                  </Typography>
                </Paper>
              ))
            ) : (
              <Box
                color="text.secondary"
                sx={{
                  textAlign: "center",
                  bgcolor: "#f8f8f8",
                  borderRadius: "0.4rem",
                  py: 1,
                  px: 2,
                }}
              >
                No events
              </Box>
            )
          ) : (
            ""
          )}
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box>
          <Typography
            variant="body"
            component="div"
            color="text.secondary"
            sx={{ ...style, cursor: "pointer", pb: 2 }}
            onClick={() => setOpenContact(!openContact)}
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              <ContactsIcon sx={{ mr: 1 }} />
              Contact
            </span>

            <span>
              <Tooltip>
                <IconButton
                  size="small"
                  color="default"
                  onClick={() => setOpenContact(!openContact)}
                >
                  {openContact ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </Tooltip>
            </span>
          </Typography>

          {openContact ? 
                <Paper
                  sx={{ p: 2, mb: 2, bgcolor: "#f8f8f8" }}
                  elevation={0}
                >
                  <Typography
                    variant="body"
                    component="div"
                    color="text.secondary"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "0.9rem",
                      mb: 1
                    }}
                  >
                    <EmailIcon fontSize="small" sx={{ mr: 1 }} />
                    {attendee[0]?.user?.email}
                  </Typography>

                  <Typography
                    variant="body"
                    component="div"
                    color="text.secondary"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "0.9rem",
                    }}
                  >
                    <LocalPhoneIcon fontSize="small" sx={{ mr: 1 }} />
                    {attendee[0]?.user?.phone || "(123) 456-7890"}
                  </Typography>

                </Paper>

                : ""
              }
        </Box>
      </Paper>
    </Box>
  );
};

export default AttendeeDetails;
