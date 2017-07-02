import docReady from 'doc-ready'
import createValidation from './../utils/createValidation'

function onDOMLoaded () {
  createValidation(1, '/step-2')
}

docReady(onDOMLoaded)
