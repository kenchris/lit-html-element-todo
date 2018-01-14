import { LitElement, html } from '../node_modules/lit-html-element/lit-element.js';

export class TodoItem extends LitElement {
  static get properties() {
    return {
      checked: { type: Boolean, attrName: "checked" },
      text: { type: String, attrName: "text" },
      index: { type: Number, attrName: "index" }
    }
  }

  handleOnRemoved = _ => this.dispatchEvent(new CustomEvent("removed", { detail: this.index }));
  handleOnChecked = _ => this.dispatchEvent(new CustomEvent("checked", { detail: this.index }));

  render({ checked, text }) {
    return html`
      <link rel="stylesheet" href="todo-item.css">
      <li class$=${checked ? 'completed' : ''}>
        <input type="checkbox" checked$=${checked} on-change=${this.handleOnChecked}></input>
        <label>${text}</label>
        <button on-click=${this.handleOnRemoved}>x</button>
      </li>
    `;
  }
}
customElements.define('todo-item', TodoItem.withProperties());