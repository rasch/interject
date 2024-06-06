# interject

`interject` is a JavaScript module for basic string interpolation.

```javascript
import { interject } from "@rasch/interject"

const user = {
  firstName: "Quinn",
  lastName: "Jones",
  email: "qjones@example.com",
}

const template = interject("{firstName} {lastName} <{email}>")

template(user)
// => 'Quinn Jones <qjones@example.com>'
```

## Installation

```sh
npm install @rasch/interject
```

## API

Include the module.

```javascript
import { interject } from "@rasch/interject"
```

Use function parameters to pass individual positional substitutions.

```javascript
interject('{0}, {1}')('Hello', 'world')
// => 'Hello, world'
```

Use an array to pass positional substitutions.

```javascript
interject('{0}, {1}')(['Hello', 'world'])
// => 'Hello, world'
```

Use an object to pass named substitutions.

```javascript
interject('{greeting}, {thing}')({ greeting: 'Hello', thing: 'world'})
// => 'Hello, world'
```
