export default class RangeControl {
  public value: number = 0;
  private element: HTMLInputElement;

  constructor(min: number, max: number, step: number = 1, parent: HTMLElement = document.body) {
    const element = document.createElement('input');
    element.setAttribute('type', 'range');
    element.setAttribute('min', min.toString());
    element.setAttribute('max', max.toString());
    element.setAttribute('step', step.toString());
    element.setAttribute('value', (min + (max - min) / 2).toString());

    this.element = element;
    parent.appendChild(this.element);
    this.value = Number(this.element.value);

    this.onChange = this.onChange.bind(this);

    this.element.addEventListener('input', this.onChange);
  }

  public onChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this.value = Number(target.value);
  }
}
