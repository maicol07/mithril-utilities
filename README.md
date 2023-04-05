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

### Available utilities
#### Component class
The `Component` class is a base class for Mithril components. It provides a few useful features:
- A base class for Mithril class components
- Type-safe props and methods
- An attributes collection wrapper

Example:
```ts
import { Component } from 'mithril-utils';

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
import {Form} from 'mithril-utils';
import {Component} from './Component';
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
