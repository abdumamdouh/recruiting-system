var compiler = require("compilex");
const { count } = require("console");
var options = { stats: true };
compiler.init(options);
const fs = require("fs");



const injectBeforeReturnStatment = function (code, start, end) {
    let temp = "";
    // 40
    const secondClk = "__measuringExecutionTimeAM2 = clock() ;\n";
    // 104
    const printStmt = `cout<<" "<<(double(__measuringExecutionTimeAM2-__measuringExecutionTimeAM1)/CLOCKS_PER_SEC)<<" "<<endl;\n`;

    for (let i = start; i < end; i++) {
        temp += code[i];
        if (temp.length === 6) {
            if (temp === "return") {
                code =
                    code.slice(0, i - 6) +
                    secondClk +
                    printStmt +
                    code.slice(i - 6);
                i += 150;
                end += 150;
            }
            temp = temp.slice(1);
        }
    }
    return code;
};

const inject = function (code, language) { 
    code = "#include <time.h>\n#include <windows.h>\n#include <Psapi.h>\n" + code.slice(0);
    const t1 = "\ndouble __measuringExecutionTimeAM1 = clock();\n";
    const t2 = "\ndouble __measuringExecutionTimeAM2 ;\n";
    const secondClk = "__measuringExecutionTimeAM2 = clock() ;\n";
    const printStmt = `cout<<" "<<(double(__measuringExecutionTimeAM2-__measuringExecutionTimeAM1)/CLOCKS_PER_SEC);`;
    const PMC = `PROCESS_MEMORY_COUNTERS_EX pmc;\n      GetProcessMemoryInfo(GetCurrentProcess(), (PROCESS_MEMORY_COUNTERS*)&pmc, sizeof(pmc)); \n    SIZE_T virtualMemUsedByMe = pmc.PrivateUsage;\n    cout << virtualMemUsedByMe<<" ";\n`;
    if (language === "cpp") {
        const mainStart = code.search("main");
        // stack to get the last '}'
        const st = [];
        let start;

        // adding the first variable inside the main function
        for (let i = mainStart; i < code.length; i++) {
            if (code[i] === "{") {
                st.push(code[i]);
                start = i + 1;
                code = code.slice(0, i + 1) + PMC + t1 + t2 + code.slice(i + 1);
                break;
            }
        }

        // getting the closing } of the main function
        for (let i = start; i < code.length; i++) {
            // console.log(st);
            if (code[i] === "{") {
                st.push("{");
            } else if (code[i] === "}") {
                st.pop();
            }

            if (st.length === 0) {
                code =
                    code.slice(0, i) +
                    secondClk +
                    "\n" +
                    printStmt +
                    code.slice(i);
                code = injectBeforeReturnStatment(code, mainStart, i);
                break;
            }
        }
        return code;
    }
};

const writeCodeToFile = function (
    code,
    jobId,
    applicantId,
    codingProblemId,
    language
) {
    const fileName = `${jobId}-${applicantId}-${codingProblemId}.${language}`;
    fs.promises.appendFile(
        `${__dirname}/../../CodingSolutions/${fileName}`,
        code,
        (err) => {
            if (err) console.log(error.message);
        }
    );
};
 
const testCode = async function (
    code,
    langauge,
    timeOut,
    inputs,
    outputs,
    index,
    numOfTests,
    finalResult,
    cb,
    specs
) {
    let result;
    let stringInput = "";
    inputs = JSON.parse(inputs);

    // stringifying the inputs array
    inputs.forEach((input) => {
        stringInput += input.toString();
        stringInput += "\n";
    });

    // console.log(stringInput)

    //Removing [] from the outputs string
    outputs = outputs.slice(1, outputs.length - 1);
    //for (int j =0 ; j < 100000 ; j++) cout<<\"\";
    switch (langauge) {
        case "cpp":
            try {
                // compilex example
                var envData = {
                    OS: "windows",
                    cmd: "g++",
                    options: { timeout: timeOut }
                };
                compiler.compileCPPWithInput(
                    envData,
                    code,
                    stringInput,
                    function (data) {
                        index.advance(); //index++
                        console.log(data)
 
                        // try catch block is needed 
                        const values = data.output.split(" ");

                        const valuesObj = {
                            memory: values[0],
                            output: values
                                .slice(1, -1)
                                .join(" "),
                            time: values[values.length - 1]
                        };

                        // console.log(valuesObj);

                        if (valuesObj.output === outputs) {
                            //storing outputs of testcases in finalResult object which is passed from the route
                            finalResult[`testCase${index.value}`] = {
                                result: "PASSED"
                            };

                            if (
                                Number(valuesObj.memory / 1e6) <
                                specs[0].memoryConstraint
                            ) {
                                finalResult[`testCase${index.value}`] = {
                                    ...finalResult[`testCase${index.value}`],
                                    memoryConsumption: `${Number(
                                        valuesObj.memory
                                    )} PASSED`
                                };
                            } else {
                                finalResult[`testCase${index.value}`] = {
                                    ...finalResult[`testCase${index.value}`],
                                    memoryConsumption: `${Number(
                                        valuesObj.memory
                                    )} FAIL`
                                };
                            }

                            if (
                                Number(valuesObj.time) < specs[0].timeConstraint
                            ) {
                                finalResult[`testCase${index.value}`] = {
                                    ...finalResult[`testCase${index.value}`],
                                    timeConsumption: `${Number(
                                        valuesObj.time
                                    )} PASSED`
                                };
                            } else {
                                finalResult[`testCase${index.value}`] = {
                                    ...finalResult[`testCase${index.value}`],
                                    timeConsumption: `${Number(
                                        valuesObj.time
                                    )} FAIL`
                                };
                            }
                        } else {
                            finalResult[`testCase${index.value}`] = "FAILED";
                        }
                        if (index.value === numOfTests) {
                            //advancing the index inside the callback of the compiler call will asure that the value of index will be testcases done by compiler so comparing it with numbOfTest cases can be an indicator for the cb function which is responsible for res.send()
                            cb();
                            // flushing files created in temp directory
                            compiler.flush(function () {
                                // console.log('All temporary files flushed !');
                            });
                        }
                        // console.log(data);

                        //console.log(index.value)
                        // compiler.fullStat(function(data){
                        //     console.log(data);

                        // });
                        // console.log(outputs)
                        // console.log(data.output)
                    }
                );
            } catch (error) {
                throw new Error(error);
            }
            break;
    }
};

module.exports = { writeCodeToFile, testCode, inject };

