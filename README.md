## Angular4-NodeJS-MySQL
This project is a program that shows the combination of angularjs, nodejs, and mysql.

### Environment
  - Node Vesion : 8.2.0
  - NPM Version : 5.3.0
  - Angular/CLI Version: 1.4.3
  - Angular : 4.3
  
### FrontEnd Side
  - You can change server address in src/app/auth.service.ts.
    ```ruby
    private loginUrl = 'http://127.0.0.1:4100/login';
    ```
  - If you want to send non-json formatted data to a server, you need to set the header options correctly and encode the body like this:
    ```ruby
    public postmethod(username: string, password: string): Promise<any> {  
      let body = `username=${username}&password=${password}`;
      return this.http
      .post(this.loginUrl, body , {headers: this.headers})
      .toPromise()
      .then( res => {
        console.log("login success",res.json().success);
        this.result_check = res.json().success;
      })
      .catch(this.handleError);
    }
    ```
### BackEnd Side
  - Install mysql package.
    ```ruby
    > npm install –save mysql
    ```
  - You have to change connection string in /config/database.js
  - You have to add the code in app.js.
    ```ruby
    var mysql = require('mysql');					
    var dbconfig = require('./config/database.js');
    var connection = mysql.createConnection(dbconfig);
    
    app.post('/login', function (req, res, next) {

    var username = req.body.username;
    var password = req.body.password;
    console.log("-:", username, password);

    var query = "SELECT * FROM user_info ";
    query += " WHERE user_name='" + username + "'";
    query += " AND user_pwd='" + password + "'";

    connection.query(query, function (err, result) {
        if(err)
            throw err;

        if (result.length > 0)
            res.send({success:true, username:username, password:password});
        else
            res.send({success:false, username:username, password:password});
    });
    ```
    
 ### MySQL Database
  ```ruby
    Database: `users`

    CREATE TABLE `user_info` (
      `id` int(11) NOT NULL,
      `user_name` varchar(64) NOT NULL,
      `user_pwd` varchar(64) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

    INSERT INTO `user_info` (`id`, `user_name`, `user_pwd`) VALUES (1, 'test', '123456');
  ```
    

