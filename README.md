# Mithril utilities
A collection of utilities for Mithril.

## Installation

```bash
pnpm add mithril-utilities
# or
# npm install mithril-utilities
# or
# yarn add mithril-utilities
```

## Usage
Mithril utilities are available as named exports from the package.

### Features/Available utilities
#### Component class
The `Component` class is a base class for Mithril components. It provides a few useful features:
- A base class for Mithril class components
- Type-safe props and methods
- An attributes collection wrapper

Example:
```ts
import { Component } from 'mithril-utilities';

class MyComponent extends Component {
  view() {
    return m('div', this.attrs);
  }
}
```

#### Reactive form
The `Form` component is an implementation of reactive forms (term from other JS frameworks),
where form elements data is costantly updated into reactive data structures.
In Mithril, this is achieved by using Streams and `input` event handlers.

It provides a few useful features:
- A reactive form component
- Easy form state management

Example:

```tsx
import {Form, Component} from 'mithril-utilities';
import Stream from 'mithril/stream';

class MyComponent extends Component {
  formState = {
    name: Stream(),
    email: Stream(),
  };

  view() {
    return (
      <Form onsubmit={this.onSubmit.bind(this)} state={this.formState}>
        <input type="text" name="name"/>
        <input type="email" name="email"/>
        <input type="submit" value="Submit"/>
      </Form>
    )
  }
  
  onSubmit(e: Event) {
    e.preventDefault();
    console.log(this.formState);
  }
}
```

#### Request class
The `Request` class is a wrapper around the `m.request` API, providing a few useful features:
- A wrapper around `m.request` with a more convenient API
- Type-safe request and response data
- Interceptors for request and response (before and after, like Axios interceptors)
- XSRF header support
- Workaround for PHP issue with PUT/PATCH/DELETE requests and FormData (see [this issue](https://bugs.php.net/bug.php?id=55815))

Examples:
```ts
import { Request } from 'mithril-utilities';

// Static methods
Request.get('/api/users');
Request.post('/api/users', {body: {name: 'John'}});
Request.put('/api/users/1', {body: {name: 'John'}});
Request.patch('/api/users/1', {body: {name: 'John'}});
Request.delete('/api/users/1');

// Instance methods
const request = new Request({
  url: '/api/users',
  method: 'GET',
  // ... (other options, check your IDE for more info)
});
```
You can pass options to the constructor, or to the static methods.

##### Interceptors
You can add interceptors to the `Request` class, to be executed before and after the request:

```ts
import {Request, RequestOptionsWithUrl} from 'mithril-utilities';

// Static
Request.get('/api/users', {
  beforeRequest: (options: RequestOptionsWithUrl) => {
    // Do something with the options
  },
  after: (response: Promise, options: RequestOptionsWithUrl) => {
    // Do something with the response (Promise)
  },
});

// Instance
const request = new Request({
  url: '/api/users',
  method: 'GET',
  beforeRequest: (options: RequestOptionsWithUrl) => {
    // Do something with the options
  },
  after: (response: Promise, options: RequestOptionsWithUrl) => {
    // Do something with the response (Promise)
  }
});
```

#### JSX IDE support
##### Prerequisites
JSX is supported by default in Mithril, but IDEs like Webstorm or VSCode don't know how to handle it.
To enable JSX support, add the following to your `tsconfig.json`:
```json
{
  "compilerOptions": {
    "jsx": "react",
    "jsxFactory": "m",
    "jsxFragmentFactory": "m.Fragment"
  }
}
```
Or, if you are using Vite:
```json
{
  "esbuild": {
    "jsxFactory": "m",
    "jsxFragment": "m.Fragment",
    "jsxInject": "import m from 'mithril'"
  }
}
```
inside your `defineConfig` function.
> **Note**
> The `jsxInject` option automatically imports `m` in every file, so you don't have to do it manually.
> Also, keep the `jsx: preserve` option in your `tsconfig.json` to avoid conflicts.

##### Further support
You can now use JSX in your Mithril components, but IDEs won't be able to provide you with much help.
To enable full support, you can install the `@types/mithril` package:
```bash
pnpm add -D @types/mithril
# or
# npm install -D @types/mithril
# or
# yarn add -D @types/mithril
```

##### Advanced typings
You can then add the advanced typings provided by this package in your `d.ts` file:
```ts
import 'mithril-utilities/typings';
```
or in your `tsconfig.json`:
```json
{
  "compilerOptions": {
    "types": [
      "mithril-utilities/typings"
    ]
  }
}
```

If you'd like to have kebabcased attributes, you can use the kebab-cased variant:
```ts
import 'mithril-utilities/typings/kebab-cased';
```
or
```json
{
  "compilerOptions": {
    "types": [
      "mithril-utilities/typings/kebab-cased"
    ]
  }
}
```

### Development
#### Setup
```bash
pnpm install
```

#### Build
```bash
pnpm build
```
