import "./AddExam.scss";
import { CSVReader } from 'react-papaparse';

export default function AddExam() {
   
    const handleOnDrop = data => {
        console.log("---------------------------");
        console.log(data);
        console.log("---------------------------");
        let arr = [];
        data.map(d => arr.push(d.data));
        const array= [...arr]
        const length =array[0].length
        arr= arr.slice(0,arr.length-1)
        let obj = arr.map((a, index) => ({
            question: a[0],
            options: a.slice(1,length-1),
            answer: a[length-1]
        }));
      
        console.log("arr", obj);
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
