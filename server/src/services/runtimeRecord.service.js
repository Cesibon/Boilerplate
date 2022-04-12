
class runtimeRecord {
    startTime
    stopTime

    runs = []
    loopStartTime


    recordName

    constructor(name){
        this.recordName = name
        this.startTime = Date.now()
    }

    looping(){
        this.loopStartTime = Date.now()
    }

    looped(){
        const loopTime = Date.now() - this.loopStartTime
        this.runs.push(loopTime)
    }

    stop(){
        this.stopTime = Date.now()
    }

    print(){
        const n = this.runs.length
        const runsSum = this.runs.reduce((a, b) => a + b)
        const mean = runsSum / n
        const std = this.runs ? Math.sqrt(this.runs.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n) : 0
        console.log(`
        Report runTimeRecord "${this.recordName}" (${(this.stopTime || Date.now()) - this.startTime} ms):\n
            - Loop number = ${n}\n
            - Total runtime = ${runsSum} ms\n
            - Average loop runtime = ${mean} ms\n
            - Standard deviation = ${std} ms\n
            - Min loop runtime = ${Math.min(this.runs)} ms\n
            - Max loop runtime = ${Math.max(this.runs)} ms\n`)
    }
}

module.exports = runtimeRecord