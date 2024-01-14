
const fs = require('fs');

export const writeToFile = (content) => {
  fs.writeFileSync('../cities.json', JSON.stringify(content));
}