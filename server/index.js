const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = "todo.proto";
const { SERVER_HOST } = require("../config.json");
const { TODOS } = require("./data");

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { options });
const todoProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();
server.addService(todoProto.TodoService.service, {
  createTodo: create_todo,
  getAllTodos: get_all_todos,
});

server.bindAsync(
  `${SERVER_HOST}`,
  grpc.ServerCredentials.createInsecure(),
  (error, _) => {
    if (error) {
      process.exit(1);
    } else {
      console.log(`Server running at ${SERVER_HOST}`);
      server.start();
    }
  }
);

// Request Handler functions
function create_todo(call, callback) {
  const todoIndex = TODOS.length + 1;
  const todo = { ...call.request, id: todoIndex };
  TODOS.push(todo);
  callback(null, todo);
}

function get_all_todos(call, callback) {
  callback(null, { todos: TODOS });
}
