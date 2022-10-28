function parseError (error) {
    if(error.name == "ValidationError") {
        return Object.values(error.errors).map(v => v.message)

    } else if(Array.isArray(error) ) {
        return error.map(x => x.msg);// много внимавай за това (x => x.msg) никаво обеснение??

    } else {
        return error.message.split('\n')
    }
    
}

module.exports = {
    parseError
};