# Test-Project
This is a project based on creation of "activity log" with Node.js, React.js and MongoDB-Atlas

It consists of 2 folders, i.e; Server and Client. Server is node and express as middleware. Client is React.

conditions:
*Run the Client and server at same time.

In Server:
1.cd server
2.npm start-->To running the project
3.In terminal it is running on the port 8090

In Clent:
1.cd client
2.npm start-->To running the project
3.Automatically opens the browser and render the Activity page


use postman:

1.(Get)http://localhost:8090/api 
          Getting all the records in the database(Mongo db)
2.(Post)http://localhost:8090/api 
          In Body(Text--> JSON)
          {"user":"****Add UserName***"}
3.(Post)http://localhost:8090/api/login/
          In Body(Text--> JSON)
          {"id":"_id"}
4.(Post)http://localhost:8090/api/createMenu/
          In Body(Text--> JSON)
          {"id":"_id"}
          
5.(Post)http://localhost:8090/api/deleteMenu/
          In Body(Text--> JSON)
          {"id":"122345"}
          
6.(Post)http://localhost:8090/api/logout/
          In Body(Text--> JSON)
          {"id":"_id"}

