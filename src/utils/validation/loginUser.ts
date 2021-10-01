import {check} from 'express-validator'
import UserModel from '../../models/User'

export default [
    check('email')
    .isEmail().withMessage('Email имеет не верный формат'),

    check('password')
    .exists().withMessage("Поле обязательно для заполнения")
]