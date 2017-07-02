import docReady from 'doc-ready'
import createValidation from './../utils/createValidation'

function onDOMLoaded () {
  createValidation(2, '/step-3', '/step-1')
}

docReady(onDOMLoaded)
