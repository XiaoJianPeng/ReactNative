class MacorCommand {
    constructor(){
        this.commandList = []
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