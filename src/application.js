const application = {
    formatHtmlBody(body,bookName){
        return `
            <h1>New Application Submitted ${bookName} by ${body.rname}</h1>
            <h5>Name: ${body.rname} </h5>
            <h5>Class: ${body.rclass} </h5>
            <h5>City: ${body.rcity}</h5>
            <h5>Phone: ${body.rphone}</h5>
            <h5>Email: ${body.remail}</h5>
        `
    }
}
module.exports=application