function test() {
  console.log("hello world");
  console.log(process.env.TEST);
}

function main() {
  require('dotenv').config();
  test();
}
