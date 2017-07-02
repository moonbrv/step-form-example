import docReady from 'doc-ready'
import { Validation } from 'bunnyjs/src/Validation'
import validators from './../utils/validators'

validators()

function onDOMLoaded () {
  const form = document.getElementById('step-1-form')
  const inn = document.getElementById('field_inn')
  const firstname = document.getElementById('field_firstname')
  const lastname = document.getElementById('field_lastname')

  Validation.init(form, true)
  console.log(Validation)

  const storagedata = sessionStorage.getItem('stepform')
  let store = {}
  if (storagedata) {
    store = Object.assign({}, JSON.parse(storagedata))
    inn.value = store.inn
    firstname.value = store.firstname
    lastname.value = store.lastname
  }

  form.addEventListener('submit', function (e) {
    const data = {
      inn: inn.value,
      firstname: firstname.value,
      lastname: lastname.value
    }
    store = Object.assign({}, data)
    sessionStorage.setItem('stepform', JSON.stringify(store))
  })
}

docReady(onDOMLoaded)
