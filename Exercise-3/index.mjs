import  get  from "axios";
import  chalk  from 'chalk';
console.log(chalk.bgBlueBright.yellowBright('This text is blue.'));
get('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => {
    console.log((response.data));
  })
  .catch(error => {
    console.error(error);
  });