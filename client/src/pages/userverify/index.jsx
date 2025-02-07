import { Box } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import AlertCard from "../../components/common/alert-card";
import { useEffect, useState } from "react";
import inviteeAPI from "../../shared/services/api/invitee";
import { ROUTES } from "../../routes/route-links";



const { ONBOARD } = ROUTES;

const UserVerifyPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(()=>{
    const verifyUser = async () => {
        return await inviteeAPI.verify(params?.token);
    }
    verifyUser().then(res=>{
        setVerified(res?.data?.success);
        setMessage(res?.data?.message);
    }).catch((err)=>console.log(err));
  }, [params?.token]);

  useEffect(()=>{
    if(verified) { 
        return navigate(`${ONBOARD.split('/:')[0]}/${params?.token}`);
    }
  }, [verified])

  return <Box>
    {message && <AlertCard message={message} color="error" reload={false} />}
  </Box>;
};

export default UserVerifyPage;
