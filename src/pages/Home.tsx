import { Navbar } from '../components'
import {Outlet} from "react-router-dom"
import {Container} from  "@mui/material"
import { Dispatch, SetStateAction } from 'react'
type Props ={
  mode:string,
  setMode:Dispatch<SetStateAction<"light"|"dark">>
}
const Home = ({mode,setMode}:Props) => {
  console.log(mode)
  return (
    <>
      {" "}
      <Navbar mode={mode} setMode={setMode}/>
      <Container maxWidth="xl" sx={{my:4}}>
        <Outlet />
      </Container>
    </>
  );
}

export default Home