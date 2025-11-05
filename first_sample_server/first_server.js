import { createServer } from "node:http";

const host_name = "127.0.0.1";
const port_name = 3000;

const server = createServer((req, res) => {
  res.statusCode === 200;
  res.setHeader("content-Type", "text-plain");
  res.end("<h1>Hello World!</h1>");
});

server.listen(port_name, host_name, () => {
  console.log(`port is running at http://${host_name}:${port_name}/`);
});
