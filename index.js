document.addEventListener("DOMContentLoaded", function() {
  removeVerticalLines();


  const attrTables = document.body.querySelectorAll('.attr-table');
  const filterBar = document.body.querySelector('.filter-bar');
  const clearButton = document.querySelector('#clear-filters-button')
  let selectedFilters = [];

  attrTables.forEach (table => {
    table.addEventListener('click', (e) =>{

      const filter = table.textContent.trim();

      if (!selectedFilters.includes(filter)) {
        selectedFilters.push(filter)
        console.log('Updated Filters List:', selectedFilters);
        addElemToFilterBar(filter)
      };

    });
  });

  clearButton.addEventListener('click', (e) => {
    selectedFilters = [];
    const selectedFiltersBox = document.body.querySelector('.selected-filters');
    selectedFiltersBox.innerHTML = '';
    filterBar.style.display = 'none';
    console.log('Updated Filters List:', selectedFilters);
    FilterCards();
  });

  function FilterCards() {
    const Cards = document.querySelectorAll('.item-container');
    
    Cards.forEach(card => {
      const attrTablesInCard = card.querySelectorAll('.attr-table');
      let matchCount = 0; 
      
      const cardOptions = Array.from(attrTablesInCard).map(option => option.textContent.trim());
  
      selectedFilters.forEach(filter => {
        if (cardOptions.includes(filter)) {
          matchCount++;
        }
      });
  
      if (matchCount === selectedFilters.length) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  function addElemToFilterBar(filter) {    
    filterBar.style.display = 'flex';

    const filterTable = document.createElement('div');
    filterTable.classList.add('selected-filter-table');
    
    const attrTable = document.createElement('div');
    attrTable.classList.add('selected-attr-table');
    attrTable.textContent = filter;
    
    const removeButton = document.createElement('div');
    removeButton.classList.add('filter-remove-button');
    const removeIcon = document.createElement('img');
    removeIcon.src = './images/icon-remove.svg';
    removeIcon.id = 'remove-icon';
    removeButton.appendChild(removeIcon);

    removeButton.addEventListener('click', function() {
      removeSelectedFilter(filterTable,filter);
    });
          
    
    filterTable.appendChild(attrTable);
    filterTable.appendChild(removeButton);
    
    const selectedFiltersBoxElem = document.querySelector('.selected-filters');
    selectedFiltersBoxElem.appendChild(filterTable);

    FilterCards();

  };

  function removeSelectedFilter(filterTable, filter) {
        filterTable.remove(); 
        
        selectedFilters = selectedFilters.filter(check => check !== filter);
        console.log('Updated Filters List:', selectedFilters);
        FilterCards();

        if(selectedFilters.length < 1) {filterBar.style.display = 'none'}
  
      }

  function removeVerticalLines() {
    const verticLineElements = document.body.querySelectorAll('.left-vertical-line');
    const featuredCardsElem = document.body.querySelectorAll('.label-featured-box');

    featuredCardsElem.forEach((card, index) => {
           const paragraph = card.querySelector('p');

            if (paragraph.textContent.trim() === '') {
              verticLineElements[index].style.display = 'none';
              featuredCardsElem[index].style.display ='none';
            }
        
    });
};

});