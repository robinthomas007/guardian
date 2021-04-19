## Coding Guidelines

Do not code like they used to code in 1990's. Code with [The next generation JavaScript](https://babeljs.io/)

There are lot of general guidelines. Here's few that I insist.

- Write clean(`Prettier` will take care of this) and `DRY`(Don’t Repeat Yourself) code.
- Avoid mutating variables. Could use [ImmutableJs](https://facebook.github.io/immutable-js/) if you like.
- Never use `var`. Use `const`
- Always use `arrow functions`(better binding of `this`)
- Use `spread` to concat arrays or objects
  ```js
  const a = { a: 1, b: 2 },
    c = { b: 0, c: 3 };
  const d = { ...a, ...c };
  ```
- Do not have more than `100` lines in a file. Break it up into multiple files.
- Do not use `a`, `x` or `temp` for variable/function names. The variable name itself should define what it does.

  ```js
  // Dirty
  const done = false;
  const complete = false;
  // Clean
  const isComplete = false;

  // Dirty
  const fetchUser = () =>
    fetch(uri) // Get from REST API
      .then(convertFormat) // Convert to snakeCase
      .then(validate); // Make sure the the user is valid
  // Clean
  const fetchUser = () =>
    fetch(uri) // Get from REST API
      .then(snakeToCamelCase) // Convert to snakeCase
      .then(validateUser); // Make sure the the user is valid
  ```

- Use [lodash](https://lodash.com/) or equivalent library for larger/nested array/object or complex calculations.
- Use `camel case` for variables, functions & for almost everything
  ```js
  const first_name = 'Radik'; // wrong
  const name = {
    'first-name': 'Radik', // wrong
    firstName: 'Radik', // correct
  };
  const firstName = 'Radik'; // correct
  ```
- Avoid passing new closures to subcomponents
  ```
  <input
    type="text"
    value={model.name}
    // onChange={(e) => { model.name = e.target.value }}
    // ^ Not this. Use the below
    onChange={this.handleChange}
    placeholder="Your Name"
  />
  ```

## Git Guidelines

### General

- Never ever push to `master` branch
- Always work in a separate branch with branch name as the ticket/task in Management tool like Jira/Trello/etc.
- Rebase branch before raising a `PR`(Pull/Merge Request)
- Make sure to run tests(`npm run test`) & validations(`npm run validate`) before committing the changes.

### Commit messages

- Don't end commit message with a period(`.`)
- Add frequent commit messages
  ```bash
  #Dirty
  login and logout
  #Clean
  #Make separate commits for login and logout features
  login
  logout
  ```
- Provide descriptive commit messages
  ```bash
  #Dirty
  login page bug fix
  #Clean
  Fix login form UI bug
  - username label fix indentation
  - password icon increase size
  ```
- Begin commit message with `Add`, `Fix`, `Enhance`, `Increase`, `Reduce` words to be more specific on type of action you did
  ```bash
  Add login feature
  Remove forgot password feature
  Enhance logout page UI
  - Add logout icon
  - Reduce logout button size
  ```
