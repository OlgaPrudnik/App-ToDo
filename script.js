//Переменные
class Todo {
  data = [];
  constructor () {
    this.openFormButtonElement = document.querySelector('.js-open-form');
    this.closeFormButtonElement = document.querySelector('.js-close-form');
    this.formElement = document.querySelector('.js-form');
    this.listWrapElement = document.querySelector('.js-list-wrap');
    this.addItemButtonElement = document.querySelector('.js-add-item');
    this.inputElement = document.querySelector('.js-input');
    this.selectPriorityElement = document.querySelector('.js-select');
    this.inputNumberElement = document.querySelector('.js-input-number');
    this.formFilterElement = document.querySelector('.js-filter-form')
    this.openFormFilterButtonElement = document.querySelector('.js-open-filter-form')
    this.inputSearchElement = document.querySelector('.js-input-search')
    this.selectSortElement = document.querySelector('.js-select-sort')
  
    this.listenEvents()
  }


listenEvents () {

  this.openFormButtonElement.addEventListener('click', this.handleClickOpenFormButton.bind(this))
  this.openFormFilterButtonElement.addEventListener('click', this.handleToggleFormFilterButton.bind(this))
  this.closeFormButtonElement.addEventListener('click', this.handleClickCloseFormButton.bind(this))
  this.formElement.addEventListener('submit', this.handleSubmitAddItemForm.bind(this))
  this.inputSearchElement.addEventListener('input', this.handleInputSearch.bind(this))
  this.selectSortElement.addEventListener('change', this.handleChangeSelectSort.bind(this))
}

  handleInputSearch ({ target }) {
    const { value } = target
    
      const resultSearch = this.data.filter((item) => {
        if (item.content.includes(value)) {
          return true
        }
    
        return false
      })
    
      if (resultSearch.length) {
        this.createList(resultSearch)
      } else {
        this.listWrapElement.innerHTML = '<div class="text-muted">Ничего не найдено</div>'
      }
    }


 handleChangeSelectSort ({target}) {
  const { value } = target

  const resultSort = this.data.sort((a, b) => {

    return a[value] - b[value]
  })

  this.createList(resultSort)
 }

handleClickOpenFormButton () {
this.formElement.classList.remove('island__item_hidden')
}

handleClickCloseFormButton () {
this.formElement.classList.add('island__item_hidden')
}

handleToggleFormFilterButton () {
  this.formFilterElement.classList.toggle('island__item_hidden')
}

handleSubmitAddItemForm (event) {
  event.preventDefault()

const content = this.inputElement.value.trim()
const date = this.buildDate()
const priority = this.selectPriorityElement.value
const estimate = this.inputNumberElement.value


if(content) {
this.data.push({ content, date, priority, estimate })
// inputElement.value = ''
this.formElement.reset() 

this.createList(this.data)
} else {
  alert('Error!!')
}
}

handleClickRemoveButton (event) {
const { target } = event

if (target.tagName =='BUTTON') {
  const { index } = target.dataset

  this.data.splice(index, 1)

  this.createList(this.data)
}
}

createListItem ({ content, date, priority, estimate }, index) {
    const template = `
    <li class="list__item">
    ${content}
    <span class="ms-3 ">${date}</span>
    <span class="ms-3 text-muted ms-auto me-3">${estimate} ч.</span>
    <span class="badge bg-light text-warning me-3">
    ${this.renderStars(priority)}
    <button class="btn btn-danger btn-sm ms-auto" data-index=${index}">&#10008;</button>
    </li>
    `

    return template
}

    createList (data = []) {
    const listElement = document.createElement('ul')
    listElement.classList.add('list')
    
    this.listWrapElement.innerHTML = ''
    data.forEach((item, index) => {
        listElement.innerHTML = listElement.innerHTML + this.createListItem(item, index)
    })

    listElement.addEventListener('click', this.handleClickRemoveButton.bind(this))

    this.listWrapElement.append(listElement)
}

buildDate () {
    const date = new Date()

    const day = date.getDate() 
    let month = +date.getMonth() + 1
    month = month < 10 ? '0' + month : month
    const year = date.getFullYear()

    const result = `${day}.${month}.${year}`

    return result
 }

renderStars (counter) {
  const template = `
  <svg width="1em" height="1em">
  <use xlink:href="#star">
  </svg>
  `
  let result = ''

  for (let i = 0; i < counter; i++) {
  result = result + template
 }

 return result
 }
}


 new Todo()