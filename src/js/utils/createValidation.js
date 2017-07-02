import { Validation } from 'bunnyjs/src/Validation'
import validators from './../utils/validators'
import axios from 'axios'
import horsey from 'horsey'

validators()

export default function createValidation (currentStep = 1, nextUrl = '/step-2', prevUrl) {
  /**
   * set width for progress bar
   */
  const stepBar = document.querySelector('.progress-bar')
  stepBar.style.width = (33.33333 * currentStep) + '%'
  stepBar.textContent = `Шаг - ${currentStep}`

  /**
   * get form and input fields
   */
  const form = document.forms[0]
  const inputs = Array.from(document.querySelectorAll('.form-group input'))

  /**
   * get data from sessionStorage
   * and if it exist fill input fields value from it
   *
   * if we have no data in storage and have url to prev step
   * we should redirect user to prev step
   */
  const storagedata = sessionStorage.getItem('stepform')
  let store = {}
  if (storagedata) {
    store = Object.assign({}, JSON.parse(storagedata))
    inputs.forEach(input => {
      input.value = store[input.name] || ''
    })
  } else {
    if (prevUrl) {
      window.location.href = prevUrl
    }
  }

  /**
   * add specific rules for inputs
   * add validation on blur event
   */
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      Validation.checkInput(input)
    })
    if (input.hasAttribute('data-lazy-city')) {
      horsey(input, {
        source (data, done) {
          if (data.input.length >= 3) {
            axios.get(`/get-city`, {
              params: {
                city: encodeURIComponent(data.input)
              }
            })
              .then(res => {
                const predictions = res.data.predictions.map(item => item.description)
                done(null, [{
                  list: predictions
                }])
              })
              .catch(err => {
                console.error(err)
              })
          }
        },
        limit: 5
      })
    }
  })

  /**
   * check buttons that should redirect us to next and prev step and attack special event for them
   */
  const nextStepBtn = document.querySelector('[data-next-step]')

  const prevStepBtn = document.querySelector('[data-prev-step]')

  const finishStepBtn = document.querySelector('[data-finish-step]')

  function goToPrevStep () {
    store[`step-${currentStep}`] = false
    saveData(store, inputs)
    window.location.href = prevUrl
  }

  function goToNextStep () {
    Validation.validateSection(form)
      .then(res => {
        // if no errors
        if (!res.length) {
          store[`step-${currentStep}`] = true
          saveData(store, inputs)
          window.location.href = nextUrl
        }
      })
  }

  function finishStep () {
    for (let step = 1; step < currentStep; step++) {
      console.log(store[`step-${step}`])
      if (!store[`step-${step}`]) {
        return false
      }
    }

    Validation.validateSection(form)
      .then(res => {
        if (!res.length) {
          axios.post('/finish', store)
            .then(res => {
              sessionStorage.removeItem('stepform')
              window.location.href = res.headers.location
            })
            .catch(err => {
              console.error(err)
            })
        }
      })
  }

  if (nextStepBtn) {
    nextStepBtn.addEventListener('click', goToNextStep)
  }

  if (prevStepBtn) {
    prevStepBtn.addEventListener('click', goToPrevStep)
  }

  if (finishStepBtn) {
    finishStepBtn.addEventListener('click', finishStep)
  }
}

/**
 * function that save data from inputs to localstorage
 *
 * @param {Object} store - data store object
 * @param {Array} inputs - array with all inputs on page
 */
function saveData (store, inputs) {
  const data = {}
  inputs.forEach(input => {
    data[input.name] = input.value
  })
  store = Object.assign(store, data)
  sessionStorage.setItem('stepform', JSON.stringify(store))
}
