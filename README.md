## MovieGenie

This is the code base for backend server for the project MovieGenie
### **Required applications**

*   **[Docker](https://www.docker.com/products/docker-desktop)** is a set of platform as a service product that uses OS-level virtualization to deliver software in packages called containers. Containers are isolated from one another and bundle their own software, libraries and configuration files; they can communicate with each other through well-defined channels.
*   **[Node.js](https://nodejs.org/en/)** is a platform built on Chrome’s JavaScript runtime for easily building fast and scalable network applications. Node.js is an open-source, cross-platform runtime environment for developing server-side and networking applications.


### **Run the MySQL server**

1.  Install Docker (Learn more about docker installation [here](https://docs.docker.com/install/))
2.  Enter on the project root directory 
3.  Run the docker `docker-compose up -d`

*   Access phpmyadmin

your\_ip:8183
Server: mysql
Username: root/root
Password: root/pass

*   Access mysql on terminal(if needed)

 docker exec -it mysql_server mysql -u root -p

Running Nodejs server
1. Install Nodejs (Download installer from [here](https://nodejs.org/en/download/))

2. RUN : `npm install`

3. Now let’s run the app by running the following command : `node server.js`.

### **Node.js Rest CRUD API overview**

We will build Rest Apis that can create, retrieve, update, delete and find users and movies by user_id.

The following table shows overview of the Rest APIs that will be exported

Run the below from [postman](https://www.postman.com/downloads/) by using [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/94d75503419a3fe82aa6)

You will get an `AuthToken` when you login. Use the token in header of api call as {Authorization: AuthToken} for authorization.

| Methods | Urls | Actions | body |
|---|---|---|---|
| POST | /signup | Signup a new user | { user_id: "test_user1", password: "test_pass1", age: 20, gender: "Male", country: "Netherlands" } |
| POST | /login | Login using username and password | { user_id: "test_user1", password: "test_pass1" } |
| GET | /users/id/{user_id} | Get the user details | |
| PUT | /users/id/{user_id}| Update user details by `id` | {password: "new_password"}|
| GET | /users/| Get all user details | |
| DELETE |/users/id/{user_id}| Delete the user by user_id| |

Tips:

After testing you can stop docker by `docker stop mysql_server phpmyadmin`
Confirm no container is running by `docker ps -a`