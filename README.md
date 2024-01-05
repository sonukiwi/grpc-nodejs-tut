# Starter App in Nodejs to implement gRPC for client and server communication

Server has an in-memory todo list with few items already.

We call server functions from client directly using gRPC to :

1. Add a todo
2. List all todos

## How To Run

- Clone the project
- Go to the project directory and run "npm install" to install dependencies.
- Once we have all dependencies installed, we need to start server locally so that it can serve client requests.
- To start server, run "npm run start-server", server should start successfully with message "Server running at ..."
- Keep server running and open another terminal and go to project directory in new terminal also.
- In new terminal, To make client calls to server, run "npm run start-client". There are two client requests going to server:
  1. Crate A Todo
  2. List All Todos
- Client should log created todo and then log all todos finally.
- That's it. You can stop the server now.
