import { Box } from "@mui/material"
import OnboardingForm from "./onboading-form"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import inviteeAPI from "../../shared/services/api/invitee";
import AlertCard from "../common/alert-card";


const Onboarding = () => {
  const params = useParams();
  const [verified, setVerified] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

    useEffect(()=>{
      const verifyUser = async () => {
        try {
          const response = await inviteeAPI.verify(params?.token);
          const { success, message, recipientEmail } = response?.data || {};
          setVerified(success);
          setMessage(message);
          setEmail(recipientEmail);
        } catch (error) {
          console.error("Error verifying user:", error);
        }
      };
      if (params?.token) {
        verifyUser();
      }
    }, [params?.token, verified]);
  
  if(!verified && message){
      return <Box><AlertCard message={message} color="error" reload={false} /></Box>;
  }
  if(verified){
    return <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <OnboardingForm recipientEmail={email}/>
      </Box>
  }
  return <></>
}

export default Onboarding