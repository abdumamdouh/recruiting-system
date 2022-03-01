const fs = require('fs')
const {c, cpp, node, python, java} = require('compile-run');






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

    //Removing [] from the outputs string
    outputs = outputs.slice(1,outputs.length-1);

    switch (langauge) 
    {
        case'cpp':
        try {
            result = await cpp.runSource(code,{stdin:`${stringInput}`})

            if (result.stdout === outputs){
                return 1 ;
            } else {
                return 0 ;
            }
        } catch (error) {
            console.log(error)
        }
        break;
    }
}

module.exports = {writeCodeToFile,testCode}
