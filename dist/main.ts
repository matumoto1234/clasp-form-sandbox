function test() {
  const prop = PropertiesService.getScriptProperties().getProperties();
  const TEST = prop.TEST;
  console.log(TEST);

}

function main() {
  test();
}

export default main;
