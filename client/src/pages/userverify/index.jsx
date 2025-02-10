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
      try {
        const response = await inviteeAPI.verify(params?.token);
        const { success, message } = response?.data || {};
        setVerified(success);
        setMessage(message);
      } catch (error) {
        console.error("Error verifying user:", error);
      }
    };
    if(verified){
      navigate(`${ONBOARD.split('/:')[0]}/${params?.token}`);
    }
    if (params?.token) {
      verifyUser();
    }
  }, [params?.token, verified]);

  if(!verified && message){
    return <Box><AlertCard message={message} color="error" reload={false} /></Box>;
  }

  return <></>

};

export default UserVerifyPage;
