// dropdown.ts
export function createCustomDropdown(selectElement: HTMLSelectElement): HTMLElement {
    const options = Array.from(selectElement.options).map(
        (option) => option.textContent || ''
    );

    const dropdownWrapper = document.createElement('div');
    const dropdownTrigger = document.createElement('button');
    const dropdownContent = document.createElement('div');
    const selectedOptionsList = document.createElement('ul');

    dropdownWrapper.className = 'dropdown-wrapper';
    dropdownTrigger.className = 'dropdown-trigger';
    dropdownTrigger.textContent = 'Custom Dropdown';
    dropdownContent.className = 'dropdown-content';

    // Initialize the selected options list
    updateSelectedOptionsList();

    dropdownTrigger.addEventListener('click', () => {
        dropdownContent.classList.toggle('show');
    });


    dropdownTrigger.addEventListener('touchend', (event) => {
        event.preventDefault(); // Prevent triggering the click event as well
        dropdownContent.classList.toggle('show');
    });

    // Add keyboard navigation support
    dropdownTrigger.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            // Toggle the dropdown content when the user presses Enter or Space
            event.preventDefault();
            dropdownContent.classList.toggle('show');
        } else if (event.key === 'ArrowDown') {
            // Move focus to the first item in the dropdown when the user presses ArrowDown
            event.preventDefault();
            (dropdownContent.getElementsByClassName('dropdown-item')[0] as HTMLElement)?.focus();
        }
    });

    options.forEach((option, index) => {
        const item = document.createElement('div');
        item.textContent = option;
        item.className = 'dropdown-item';

        // Update item style if the option is selected
        if (selectElement.options[index].selected) {
            item.style.backgroundColor = '#f0f0f0';
        }

        item.addEventListener('click', () => {
            // Toggle the selected state of the option
            selectElement.options[index].selected = !selectElement.options[index].selected;

            // Update the item style based on the selected state
            if (selectElement.options[index].selected) {
                item.style.backgroundColor = '#f0f0f0';
            } else {
                item.style.backgroundColor = '';
            }

            updateSelectedOptionsList();
            selectElement.dispatchEvent(new Event('change'));
        });

        // Add touch event listeners for mobile devices
        item.addEventListener('touchend', (event) => {
            event.preventDefault(); // Prevent triggering the click event as well
            toggleOption(index);
        });

        // Add keyboard navigation support
        item.tabIndex = 0; // Make the item focusable
        item.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                // Toggle the option when the user presses Enter or Space
                event.preventDefault();
                toggleOption(index);
            } else if (event.key === 'ArrowDown') {
                // Move focus to the next item when the user presses ArrowDown
                event.preventDefault();
                (dropdownContent.getElementsByClassName('dropdown-item')[index + 1] as HTMLElement)?.focus();
            } else if (event.key === 'ArrowUp') {
                // Move focus to the previous item when the user presses ArrowUp
                event.preventDefault();
                (dropdownContent.getElementsByClassName('dropdown-item')[index - 1] as HTMLElement)?.focus();
            }
        });


        dropdownContent.appendChild(item);
    });

    function toggleOption(index: number) {
        selectElement.options[index].selected = !selectElement.options[index].selected;
        const item = dropdownContent.getElementsByClassName('dropdown-item')[index] as HTMLElement;

        if (selectElement.options[index].selected) {
            item.style.backgroundColor = '#f0f0f0';
        } else {
            item.style.backgroundColor = '';
        }

        updateSelectedOptionsList();
        selectElement.dispatchEvent(new Event('change'));
    }

    function updateSelectedOptionsList() {
        selectedOptionsList.innerHTML = '';

        Array.from(selectElement.selectedOptions).forEach((option) => {
            const listItem = document.createElement('li');
            listItem.textContent = option.textContent || '';
            listItem.className = 'selected-option';

            listItem.addEventListener('click', () => {
                const originalIndex = Array.from(selectElement.options).findIndex(
                    (opt) => opt.value === option.value
                );

                if (originalIndex > -1) {
                    // Deselect the option in the original select element
                    selectElement.options[originalIndex].selected = false;

                    // Update the item style in the custom dropdown
                    const customItem = dropdownContent.getElementsByClassName('dropdown-item')[originalIndex] as HTMLElement;
                    customItem.style.backgroundColor = '';

                    // Update the list of selected options
                    updateSelectedOptionsList();

                    // Dispatch change event on the select element
                    selectElement.dispatchEvent(new Event('change'));
                }
            });


            selectedOptionsList.appendChild(listItem);
        });
    }


    dropdownWrapper.appendChild(dropdownTrigger);
    dropdownWrapper.appendChild(dropdownContent);
    dropdownWrapper.appendChild(selectedOptionsList);

    return dropdownWrapper;
}