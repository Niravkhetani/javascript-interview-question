/* Execute 2 concurrent jobs with monotonicity or index order and store there output */

async function runWithLimit(tasks, concurrency){
    let result = new Array(tasks.length)
    let currentIdx = 0
    let running = 0

    return new Promise((resolve)=>{
        function runNext(){
            if(currentIdx === tasks.length && running===0){
                resolve(result)
            }
            while(running < concurrency && currentIdx < tasks.length){
                const index = currentIdx++;
                running++;
                console.log("tasks[index]",tasks[index],index)
                Promise.resolve(tasks[index]()).then((value)=>{
                    result.push(value)
                }).catch((err)=>{
                    result.push(err)
                }).finally(()=>{
                    running--
                    runNext()
                })
            }
        }
        runNext()
    })
}


function createTask(id, delay, shouldFail = false) {
    return async () => {
        console.log(`Task ${id} started`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        if (shouldFail) {
            throw new Error(`Task ${id} failed`);
        }
        console.log(`Task ${id} finished`);
        return `Result ${id}`;
    };
}

const tasks = [
    createTask(1, 3000),
    createTask(2, 1000),
    createTask(3, 2000),
    createTask(4, 500),
    createTask(5, 4000)
];

runWithLimit(tasks,2)