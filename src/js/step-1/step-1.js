import docReady from 'doc-ready'
import { Validation } from 'bunnyjs/src/Validation'
import validators from './../utils/validators'

validators()

function onDOMLoaded () {
  const form = document.getElementById('step-1-form')
  const suma = document.getElementById('field_summa')
  const srok = document.getElementById('field_srok')

  Validation.init(form, true)

  const storagedata = sessionStorage.getItem('stepform')
  let store = {}
  if (storagedata) {
    store = Object.assign({}, JSON.parse(storagedata))
    suma.value = store.suma
    srok.value = store.srok
  }

  form.addEventListener('submit', function (e) {
    const data = {
      suma: suma.value,
      srok: srok.value
    }
    store = Object.assign({}, data)
    sessionStorage.setItem('stepform', JSON.stringify(store))
  })
}

docReady(onDOMLoaded)
