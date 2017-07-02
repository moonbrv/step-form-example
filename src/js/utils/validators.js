import { Validation } from 'bunnyjs/src/Validation'
import { dateOfBirth, haveYears } from './dateOfBirthHelpers'

export default function () {
  /**
   * Validation translation to russian
   */
  Validation.lang.required = 'Поле обязательно для заполнения'

  /**
   * Custrom integer validator
   */
  Validation.lang.integer = 'Введите целое число'

  Validation.validators.integer = input => {
    return new Promise((resolve, reject) => {
      if (input.hasAttribute('data-integer')) {
        if (input.value.match(/^[0-9]{1,}$/)) {
          resolve()
        } else {
          const err = new Error('not integer')
          reject(err)
        }
      } else {
        resolve()
      }
    })
  }

  /**
   * Custrom summ validator
   */
  Validation.lang.sum = 'Сума должна быть в диапазаоне 1-10000'

  Validation.validators.sum = input => {
    return new Promise((resolve, reject) => {
      if (input.hasAttribute('data-sum')) {
        const val = parseInt(input.value)
        if ((val >= 1) && (val <= 10000)) {
          resolve()
        } else {
          const err = new Error('not sum')
          reject(err)
        }
      } else {
        resolve()
      }
    })
  }

  /**
   * Custrom srok validator
   */
  Validation.lang.srok = 'Срок должен быть в диапазаоне 1-12'

  Validation.validators.srok = input => {
    return new Promise((resolve, reject) => {
      if (input.hasAttribute('data-srok')) {
        if ((input.value >= 1) && (input.value <= 12)) {
          resolve()
        } else {
          const err = new Error('not sum')
          reject(err)
        }
      } else {
        resolve()
      }
    })
  }

  /**
   * Custrom inn validator
   */
  Validation.lang.inn = 'ИНН должен содержать 10 цифр'

  Validation.validators.inn = input => {
    return new Promise((resolve, reject) => {
      if (input.hasAttribute('data-inn')) {
        if ((input.value.length === 10) && (input.value.match(/^[0-9]{1,}$/ig))) {
          resolve()
        } else {
          const err = new Error('not sum')
          reject(err)
        }
      } else {
        resolve()
      }
    })
  }

  /**
   * Custrom 21 y.o validator
   */
  Validation.lang.twentyone = 'Вам не исполнился 21 год'

  Validation.validators.twentyone = input => {
    return new Promise((resolve, reject) => {
      if (input.hasAttribute('data-twentyone')) {
        const days = input.value.slice(0, 4)
        const has21 = haveYears(dateOfBirth(days), 21)
        if (has21) {
          resolve()
        } else {
          const err = new Error('not sum')
          reject(err)
        }
      } else {
        resolve()
      }
    })
  }
}
