
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

const testCode = async function (code,langauge,timeOut,inputs,outputs){
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
                compiler.fullStat(function(data){
                    console.log(data);
                });
                // console.log(outputs)
                // console.log(data.output)
                // if (data.output === outputs){
                //     console.log('PASSED...') ;
                // } else {
                //     console.log('FAILED...') ;
                // }   
                // console.log(data);
            }); 
        } catch (error) {
            throw new Error (error)
        }
        break;
    }
}

module.exports = {writeCodeToFile,testCode}

