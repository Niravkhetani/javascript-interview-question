/* Rate limitter sliding window */

const requestHash = {}

function rateLimit(userId,timestamp,N){
    if(!requestHash[userId]){
        requestHash[userId] = []
    }
    const requests = requestHash[userId]
    while (requests.length >= N && timestamp <= requests[0]){
        requests[userId].shift()
    }

    if(requestHash[userId]>=N){
        return false
    }
    requests.push(timestamp)
    return true

}