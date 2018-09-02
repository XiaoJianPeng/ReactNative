class Bank {
    constructor() {
        this.userList = []
    }
    
    addListen(user) {
        this.userList.push(user)
    }

    sendMsg(userId, balanceChange) {
        const user = this.userList.find(item => item.userId === userId)
        if(user) {
            user.balance += balanceChange
            console.log('尊敬的用户'+user.name+'，你的账号余额发生'+ balanceChange+'元变化，目前可用余额为：'+user.balance)
        }
    }
}

export default Bank
