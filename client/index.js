const grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = "todo.proto";
const { SERVER_HOST } = require("../config.json");

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const TodoService = grpc.loadPackageDefinition(packageDefinition).TodoService;

const client = new TodoService(
  `${SERVER_HOST}`,
  grpc.credentials.createInsecure()
);

try {
  client.createTodo({ title: "Learn gRPC Streams" }, (err, todo) => {
    if (err) {
      console.error("Error in creating todo: ", err);
      throw err;
    } else {
      console.log("Todo created successfully: ", todo);
      console.log("Now, listing all todos using stream: ");
      client.getAllTodos({}, (err, response) => {
        if (err) {
          console.error("Error in listing todos: ", err);
          throw err;
        } else {
          response.todos.forEach((todo) => {
            console.log(`> ${todo.title}`);
          });
        }
      });
    }
  });
} catch (err) {
  console.error("Aborting due to unexpected error");
  process.exit(1);
} finally {
  client.close();
}
