import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Chip, Divider, Switch } from '@mui/material';
import Markdown from 'react-markdown';
import dayjs from 'dayjs';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

export default function ApplicationCard({ user, event, participantInfo, otherInfo, presentations, registrationDate, isApproved }) {
  const [expanded, setExpanded] = React.useState(false);

  const topics = participantInfo?.topicsOfInterest?.split(',');

  const handleApprove = async () => {

  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardHeader
        // avatar={
        //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        //     {user?.firstName[0]}
        //   </Avatar>
        // }
        action={
          <IconButton aria-label="approve">
            <Switch defaultChecked />
          </IconButton>
        }
        title={event?.name}
        subheader={dayjs(event?.startTime).format("MMM DD, YYYY")}
      />
      <CardContent sx={{ my: 1 }}>
        Applied by: <Typography variant='body2' color='primary' mb={2}>{user?.fullName} <Chip variant='contained' color='secondary' label={user?.role?.toUpperCase()} /></Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          <Markdown>{presentations?.content}</Markdown>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        Applied on: {dayjs(registrationDate).format("ddd, MMM YYYY")}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
      <Divider sx={{ my: 1 }}/>
        <CardContent>
          <Typography>Topics:</Typography>
          <Typography sx={{ marginBottom: 2 }}>
            {topics.map((t)=><Chip variant='outline' label={t} color='primary' />)}
          </Typography>
          <Typography sx={{ mt: 2 }}>Bio:</Typography>
          <Typography sx={{ marginBottom: 2 }}>
            <Markdown>{participantInfo?.bio}</Markdown>
          </Typography>
          <Typography>Experience:</Typography>
          <Typography sx={{ marginBottom: 2 }}>
            <Markdown>{participantInfo?.previousExperience}</Markdown>
          </Typography>
          <Typography>Attending reason:</Typography>
          <Typography sx={{ marginBottom: 2 }}>
            <Markdown>{otherInfo?.reasonForAttend}</Markdown>
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
