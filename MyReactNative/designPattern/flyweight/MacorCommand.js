class MacorCommand {
    constructor(){
        this.commandList = []
        console.log(111)
    }

    add(command) {
        this.commandList.push(command)
    }

    execute() {
        this.commandList.forEach((item) => {
            item.execute()
        })
    }
}