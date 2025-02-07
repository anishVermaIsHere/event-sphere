import { Box } from "@mui/material"
import OnboardingForm from "./onboading-form"
import { useParams } from "react-router-dom"
import { useEffect } from "react";

const Onboarding = () => {
  const params = useParams();
  console.log(params);


  useEffect(()=>{
    
  }, [])
  
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <OnboardingForm />
    </Box>
    
  )
}

export default Onboarding