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
            question: a.question,
            options: [a.option1, a.option2, a.option3, a.option4],
            answer: a.answer
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
                    header: true
                }}
                onRemoveFile={handleOnRemoveFile}
            >
                <span>Drop CSV file here or click to upload.</span>
            </CSVReader>
        </div>
    );
}
