import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import dayjs from 'dayjs';
import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import { useState } from 'react';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import { createTheme, ThemeProvider } from '@mui/material';
import Switch from '@mui/material/Switch';
import { red } from '@mui/material/colors';
import FormControlLabel from '@mui/material/FormControlLabel';
import { alpha, styled } from '@mui/material/styles';
import { useTodos } from "../context/NoteContext";
import { useAuth } from "../context/AuthContext";



const RedSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: red[500],
    '&:hover': {
      backgroundColor: alpha(red[500], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: red[500],
  },
}));

const themeCalendar = createTheme({
  typography: {
    fontSize: 20,
    fontFamily: [
      'Montserrat',
      'sans-serif',
    ].join(','),
  },
});

const themeInputbox= createTheme({
  typography: {
    fontSize: 15,
    fontFamily: [
      "McLaren", "cursive"
    ].join(','),
  },
});

function dateConverter(date){
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  return (`${weekday[date.$d.getDay()]}, ${date.$D}.${date.$M + 1}.${date.$y}`);
}

function timeConverter(date){
  const hours = date.$d.getHours() < 10 ? `0${date.$d.getHours()}` : `${date.$d.getHours()}`
  const minutes = date.$d.getMinutes() < 10 ? `0${date.$d.getMinutes()}` : `${date.$d.getMinutes()}`
  return (`${hours}:${minutes}`)
}



function CreateArea() {

  const {createTodo, error, dispatch} = useTodos();
  const {user} = useAuth();
  

  const d = new Date();

  const [date, setDate] = useState(() => dayjs(d.toDateString()));
  const [isImportant, setIsImportant] = useState(false);
  const [text, setText] = useState("");
  const [inputError, setInputError] = useState(false);



  const handleSwitch = (event) => {
    setIsImportant(event.target.checked);
  }

  function setTime(value){
    setDate(value);
    
    
  }

  function handleChange(event) {
    setText(event.target.value);
    setInputError(false);
  }

  function submitNote(event) {
    event.preventDefault();
    if(text === ""){
      setDate(() => dayjs(d));
      setIsImportant(false);
      setInputError(true);
    }
    else{
      const newTodo = {
        date : dateConverter(date),
        time : timeConverter(date),
        text,
        isImportant,
        dateObject: date
      }
      if(user){
        createTodo(newTodo);
      }
      
      setDate(() => dayjs(d));
      setIsImportant(false);
      setText("");
      
      
    }
    
  }
  

  return (
    
    <>
    <ThemeProvider theme={themeCalendar}>
    <div className="calendar">
      
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      
      <StaticDateTimePicker
        slotProps={{actionBar : {actions : []}}}
        orientation="landscape"
        value={date}
        onChange={setTime}
        

      />
      
      </LocalizationProvider>

    </div>
    </ThemeProvider>

    
    <ThemeProvider theme={themeInputbox}>
      <div className="formarea">
      <form className="create-note">
          
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      
      <DateTimeField
        label=""
        value={date}
        onChange={setTime}
        slotProps={{ textField: { variant: 'standard'} }}
        
      />
      
       </LocalizationProvider>

      
      <FormControlLabel
        value = {isImportant}
        label = "Priority"
        labelPlacement= "start"
        control = {<RedSwitch
        checked={isImportant}
        value={isImportant}
        onChange={handleSwitch}
        inputProps={{ 'aria-label': 'warning' }}
        color={isImportant ? "warning" : "default"}
        />}
      />
      
        <textarea
          className={inputError ? "error" : ""}
          name="content"
          onChange={handleChange}
          value={text}
          placeholder="Type a Todo"
          rows="3"
        />
        
        <Fab color="primary" onClick={submitNote}><AddIcon/></Fab>
        
      </form>
      </div>
      </ThemeProvider>
    </>
  );
}


export default CreateArea;
