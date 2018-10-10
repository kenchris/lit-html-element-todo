import { LitElement, html } from '../node_modules/lit-html-element/lit-element.js';

export class TodoInput extends LitElement {
  constructor() {
    super();
    this.value = '';
  }

  handleInputChange(ev) {
      this.value = ev.target.value;
  }

  handleOnSubmit(ev) {
      ev.preventDefault();
      if (!this.value) return;
      this.dispatchEvent(new CustomEvent("submit", { detail: this.value }));
      this.value = '';
      this.invalidate();
  }

  render() {
    return html`
      <link rel="stylesheet" href="todo-input.css">
      <form on-submit=${this.handleOnSubmit.bind(this)}>
        <input 
            value=${this.value} 
            type="text" 
            placeholder="What needs to be done?" 
            on-input=${this.handleInputChange.bind(this)}/>
      </form>
    `;
  }

}
customElements.define("todo-input", TodoInput.withProperties());
