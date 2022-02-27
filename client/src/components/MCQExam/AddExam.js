import "./AddExam.scss";
import { CSVReader } from 'react-papaparse';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import {useState} from 'react';
import {createExamAction} from '../../redux/actions/exam'
import { useDispatch, useSelector } from "react-redux";
export default function AddExam() {
const [topic,setTopic]=useState('')
const dispatch = useDispatch();
const jobId= useSelector(state=>state.job.id)
console.log(jobId)
    const handleOnDrop = data => {
        
        console.log("---------------------------");
        console.log(data);
        console.log("---------------------------");
        let arr = [];
        data.map(d => arr.push(d.data));
        const array= [...arr]
        const length =array[0].length
        arr= arr.slice(0,arr.length-1)
        let questions = arr.map((a, index) => ({
            question: a[0],
            options: a.slice(1,length-1),
            answer: a[length-1],
            
        }));
      
        console.log("arr", questions);
        
        dispatch(createExamAction(jobId,topic,questions))
    };

    const handleOnError = (err) => {
        console.log(err);
    };

    const handleOnRemoveFile = data => {
        console.log("---------------------------");
        console.log(data);
        console.log("---------------------------");
    };

    return (
        <div className="Exam">
        <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Exam topic" variant="outlined" onChange={(e)=>setTopic(e.target.value)}/>
      
    </Box>
            <h4 style={{color: 'black', 'marginBottom': '20px'}}>Click and Drag Upload</h4>
            <CSVReader
                onDrop={handleOnDrop}
                onError={handleOnError}
                addRemoveButton
                config={{
                    header: false
                }}
                onRemoveFile={handleOnRemoveFile}
            >
                <span>Drop CSV file here or click to upload.</span>
            </CSVReader>
        </div>
    );
}
