import { LitElement, html } from '../node_modules/lit-html-element/lit-element.js';

class MyTodo extends LitElement {
  constructor() {
    super();

    this.list = [
      { text: 'my initial todo', checked: false },
      { text: 'Learn about Web Components', checked: true }
    ];
  }

  _onTodoInputSubmit(ev) {
    this.list = [...this.list, { text: ev.detail, checked: false, }];
    this.invalidate();
  }

  _onTodoItemChecked(ev) {
    const item = this.list[ev.detail];
    this.list[ev.detail] = Object.assign({}, item, { checked: !item.checked });
    this.invalidate();
  }

  _onTodoItemRemoved(ev) {
    this.list = [...this.list.slice(0, ev.detail), ...this.list.slice(ev.detail + 1)];
    this.invalidate();
  }

  render() {
    return html`
      <link rel="stylesheet" href="my-todo.css">
      <div>
        <h1>Lit Todos</h1>
          <section>
            <todo-input on-submit=${this._onTodoInputSubmit.bind(this)}></todo-input>
            <ul id="list-container">
              ${ this.list.map((item, index) => html`
                <todo-item 
                  checked=${item.checked}
                  text=${item.text}
                  index=${index}
                  on-removed=${this._onTodoItemRemoved.bind(this)}
                  on-checked=${this._onTodoItemChecked.bind(this)}
                ></todo-item>
              `)}
            </ul>
          </section>
      </div>
    `;
  }
}
customElements.define("my-todo", MyTodo.withProperties());
