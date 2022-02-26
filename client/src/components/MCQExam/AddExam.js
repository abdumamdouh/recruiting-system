import "./AddExam.scss";
import { CSVReader } from 'react-papaparse';

export default function AddExam() {
   
    const handleOnDrop = data => {
        console.log("---------------------------");
        console.log(data);
        console.log("---------------------------");
        const arr = [];
        data.map(d => arr.push(d.data));
        let obj = arr.map((a, index) => ({
            question: a[0],
            options: [a[1], a[2], a[3], a[4]],
            answer: a[5]
        }));
        console.log("arr", obj);
    };

    const handleOnError = (err, file, inputElem, reason) => {
        console.log(err);
    };

    const handleOnRemoveFile = data => {
        console.log("---------------------------");
        console.log(data);
        console.log("---------------------------");
    };

    return (
        <div className="Exam">
            <h5>Click and Drag Upload</h5>
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
