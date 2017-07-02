import docReady from 'doc-ready'
import createValidation from './../utils/createValidation'

function onDOMLoaded () {
  createValidation(3, null, '/step-2')
}

docReady(onDOMLoaded)
