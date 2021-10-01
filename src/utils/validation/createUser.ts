import {check} from 'express-validator'
import { UserModel } from '../../models/Index'

export default [
    check('email')
    .isEmail().withMessage("Не является Email")
    .exists().withMessage("Email обязателен для заполнения")
    .custom(async value => {
        const user = await UserModel.findOne({ email: value })
        if (user)
            return Promise.reject('Данный Email уже используется')
    }),

    check('password')
    .isLength({min: 8}).withMessage("Длина пароля должна быть не менее 8 символов")
    .custom((value, {req}) => {
        if(value !== req.body.passwordConfirm)
        return Promise.reject("Пароли не совпадают")
        else return true
    }),

    check('firstName')
    .isLength({min: 2}).withMessage("Длинна имени должна быть более 2 символов"),

    check('lastName')
    .isLength({min: 2}).withMessage("Длинна фамилии должна быть более 2 символов"),

    check('gender')
    .isNumeric().withMessage("Не верный тип пола")
    .isIn([0, 1]).withMessage("Не верный тип пола")
    .exists().withMessage("Вы не указали пол"),

    check('birthday')
    .isDate().withMessage("Не правильный формат даты")
    .exists().withMessage("Поле день рождения, обязательно к заполнению")
]