import { hashSync } from 'bcrypt'

import { curry, evolve, flip } from 'ramda'

export const hashBodyPassword = evolve({ password: flip(curry(hashSync))(10) })
