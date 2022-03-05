
var compiler = require('compilex');
var options = {stats : true}; 
compiler.init(options);
const fs = require('fs')



// function sleep(milliseconds) {
//     const date = Date.now();
//     let currentDate = null;
//     do {
//       currentDate = Date.now();
//     } while (currentDate - date < milliseconds);
// }



// const inject = function (code , language) {
//     const t1 = 'double __measuringExecutionTimeAM ;'

//     if (language == 'cpp'){
//         const index = code.search('main')

//         for (let i = index ; i < code.length ; i++){
//             if (code[i] == '{'){

//             }
//         }
//     }
// }



const writeCodeToFile = function (code,jobId,applicantId,codingProblemId,language) {
    const fileName = `${jobId}-${applicantId}-${codingProblemId}.${language}`
    fs.promises.appendFile(`${__dirname}/../../CodingSolutions/${fileName}`, code, (err) => {
        if (err) 
        console.log(error.message);
    })
}

const testCode = async function (code,langauge,timeOut,inputs,outputs,index,numOfTests,finalResult,cb){
    let result ;
    let stringInput = '' ;
    inputs = JSON.parse(inputs)

    // stringifying the inputs array
    inputs.forEach((input) => {
        stringInput+=input.toString()
        stringInput+='\n'
    })

    // console.log(stringInput)

    //Removing [] from the outputs string
    outputs = outputs.slice(1,outputs.length-1);

    switch (langauge) 
    {
        case'cpp':
        try {
            // compilex example
            var envData = { OS : "windows" , cmd : "g++"};
            compiler.compileCPPWithInput(envData , code , stringInput , function (data) {
                index.advance() ;//index++

                if (data.output === outputs){//storing outputs of testcases in finalResult object which is passed from the route
                    finalResult[`testCase${index.value}`]="PASSED" 
                } else {
                    finalResult[`testCase${index.value}`]="FAILED"
                }   
                if(index.value===numOfTests){//advancing the index inside the callback of the compiler call will asure that the value of index will be testcases done by compiler so comparing it with numbOfTest cases can be an indicator for the cb function which is responsible for res.send()
                    cb();
                }
                // console.log(data);
                
                //console.log(index.value)
                // compiler.fullStat(function(data){
                //     console.log(data);
                    
                // });
                // console.log(outputs)
                // console.log(data.output)
            }); 
        } catch (error) {
            throw new Error (error)
        }
        break;
    }
}

module.exports = {writeCodeToFile,testCode}

