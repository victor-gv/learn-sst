import { StackContext, Api, Table } from "sst/constructs";

export function API({ stack }: StackContext) {
  const table = new Table(stack, "TODO", {
    fields: {
      userId: "string",
      todoId: "string",
      title: "string",
    },
    primaryIndex: { partitionKey: "userId", sortKey: "todoId" },
  });

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        bind: [table],
      },
    },
    routes: {
      "GET /": "packages/functions/src/todo.findAll",
      "POST /": "packages/functions/src/todo.create",
      "GET /{id}": "packages/functions/src/todo.findOne",
      "PATCH /{id}": "packages/functions/src/todo.update",
      "DELETE /{id}": "packages/functions/src/todo.delete",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
