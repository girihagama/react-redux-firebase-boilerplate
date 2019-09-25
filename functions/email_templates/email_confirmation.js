module.exports = function (firstName, lastName, siteName, confirmationUrl) {
    return (
        `<!DOCTYPE html>
        <html>
        <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        </head>
        <body class="text-center" style="margin:5px 0px 5px 0px;font-family:calibri;">
        
        <div class="container-fluid">
        <div class="row">
        <div class="col-md-12">
        <div class="card text-white bg-info">
        
        <h5 class="card-header font-weight-bold">
        Confirm Your Email Address
        </h5>
        
        <div class="card-body text-left">
        <p class="card-text">
        Hello ${firstName} ${lastName},
        </p>
        <p class="card-text">
        You can confirm your email address by clicking the following button.
        If you didn't create a user account at ${siteName}, please ignore this email.
        </p>

        <a class="btn btn-warning" href="${confirmationUrl}" role="button">Verify!</a>

        </div>
        <div class="card-footer">
        © 2019 - ${siteName} | All Rights Reserved
        </div>
        
        </div>
        </div>
        </div>
        </div>
        
        </body>
        </html>`
    )
}