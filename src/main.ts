import { createCustomDropdown } from './dropdown';
import "./style.css"

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <select id="mySelect" multiple>
    <option value="Option 1">Option 1</option>
    <option value="Option 2">Option 2</option>
    <option value="Option 3">Option 3</option>
    <!-- Add more options here -->
  </select>
`;

const selectElement = document.getElementById('mySelect') as HTMLSelectElement;
selectElement.style.display = 'none';
console.log('Original select element:', selectElement)

const customDropdown = createCustomDropdown(selectElement);
(document.getElementById('app') as HTMLElement).appendChild(customDropdown);

// Optional: Add event listener for the original select element
selectElement.addEventListener('change', () => {
    const selectedOptions = Array.from(selectElement.selectedOptions).map(
        (option) => option.value
    );
    console.log('Selected options:', selectedOptions);
});

