const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const db = require('../models')
const helper = require('../helper/serialize')
const { validate } = require('../helper/validator')
const passport = require('passport')
const tokens = require('../auth/tokens')
const formidable = require('formidable')

const auth = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (!user || err) {
            return res.status(401).json({
                code: 401,
                message: 'Unauthorized',
            })
        }

        req.user = user

        next()
    })(req, res, next)
}

router.post('/registration', async (req, res) => {
    const { username } = req.body
    console.log('req', req.url)
    const user = await db.getUserByName(username)

    if (user) {
        return res.status(409).json({ message: 'Пользователь с таким ником уже существует!'})
    }

    try {
        const newUser = await db.createUser(req.body)

        res.status(201).json({
            ...helper.serializeUser(newUser),
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: e.message })
    }
})

router.post('/login', async (req, res, next) => {
    passport.authenticate(
        'local',
        { session: false },
        async (err, user, info) => {
            if (err) {
                return next(err)
            }

            if (!user) {
                return res.status(400).json({ message: 'Не верный логин/пароль'})
            }

            if (user) {
                console.log(user)
                const token = await tokens.createTokens(user)
                console.log(token)
                res.json({
                    ...helper.serializeUser(user),
                    ...token,
                })
            }
        },
    )(req, res, next)
})

router.post('/refresh-token', async (req, res) => {
    const refreshToken = req.headers['authorization']

    const data = await tokens.refreshTokens(refreshToken)
    res.json({ ...data })
})


router.get('/profile', auth, async (req, res) => {
    const user = req.user

    res.json({
        ...helper.serializeUser(user),
    })
})

router.patch('/profile', auth, async (req, res, next) => {
    let form = new formidable.IncomingForm()
    let upload = path.join(process.cwd(), 'upload')
    // fs.mkdir(upload, (err) => {
    //     console.log('folder created')
    // })
    form.uploadDir = path.join(process.cwd(), upload)
    console.log('form.uploadDir', form.uploadDir)
    form.parse(req, (err, fields, files) => {
        console.log('fields', {fields, files})
        if (err) {
            return next()
        }
        const { status, error } = validate(fields,files)
        if (error) {
            fs.unlink(files.photo.filepath, (err) => {
                console.log('Something went wrong while deleting temporary file')
            })
            return next()
        }
        const fileName = path.join(upload, files.photo.originalFilename)
        fs.rename(files.photo.filepath, fileName, async (err) => {
            if (err) {
                console.log(err.message)
            }
            let dir = fileName.substr(fileName.indexOf('\\'))
            console.log('fields', {fields, fileName})
            return res.json({...fields, ...fileName})
        })
    })
    console.log('???')
})

module.exports = router

/*/!* Authentication *!/
router.post('/api/registration', (req, res, next) => {
    // Expected:
    /!*
    {
    firstName: String,
    id: Primary key,
    image: String,
    middleName: String,
    permission: {
        chat: { C: Boolean, R: Boolean, U: Boolean, D: Boolean },
        news: { C: Boolean, R: Boolean, U: Boolean, D: Boolean },
        settings: { C: Boolean, R: Boolean, U: Boolean, D: Boolean }
    }
    surName: String,
    username: String,

    accessToken: String,
        refreshToken: String,
        accessTokenExpiredAt: Date (ms),
        refreshTokenExpiredAt: Date (ms)
    }
    *!/
})
router.post('/api/login', (req, res, next) => {
    // Expected:
    /!*
    {
    firstName: String,
    id: Primary key,
    image: String,
    middleName: String,
    permission: {
        chat: { C: Boolean, R: Boolean, U: Boolean, D: Boolean },
        news: { C: Boolean, R: Boolean, U: Boolean, D: Boolean },
        settings: { C: Boolean, R: Boolean, U: Boolean, D: Boolean }
    }
    surName: String,
    username: String,

    accessToken: String,
        refreshToken: String,
        accessTokenExpiredAt: Date (ms),
        refreshTokenExpiredAt: Date (ms)
    }
    *!/
})
router.post('/api/refresh-token', (req, res, next) => {
    // Expected:
    /!*
    {
        accessToken: String,
            refreshToken: String,
        accessTokenExpiredAt: Date (ms),
        refreshTokenExpiredAt: Date (ms)
    }
    *!/
})
/!* *!/

/!* Profile *!/
router.get('/api/profile', (req, res, next) => {
    // Expected:
    /!*
    {
        firstName: String,
        middleName: String,
        surName: String,
        oldPassword: String,
        newPassword: String,
        avatar: File
    }
    *!/
})
router.patch('/api/profile', (req, res, next) => {
    // Expected:
    /!*
    {
        firstName: String,
        middleName: String,
        surName: String,
        oldPassword: String,
        newPassword: String,
        avatar: File
    }
    *!/
})
/!* *!/

/!* Users *!/
router.get('/api/users', (req, res, next) => {
    // Expected:
    /!*
    {
        firstName: String,
        id: Primary key,
        image: String,
        middleName: String,
        permission: {
            chat: { C: Boolean, R: Boolean, U: Boolean, D: Boolean },
            news: { C: Boolean, R: Boolean, U: Boolean, D: Boolean },
            settings: { C: Boolean, R: Boolean, U: Boolean, D: Boolean }
        }
        surName: String,
        username: String
    }
    *!/
})
router.patch('/api/users/:id/permission', (req, res, next) => {
    // Expected:
    /!*
    {
        permission: {
            chat: { C: Boolean, R: Boolean, U: Boolean, D: Boolean },
            news: { C: Boolean, R: Boolean, U: Boolean, D: Boolean },
            settings: { C: Boolean, R: Boolean, U: Boolean, D: Boolean }
        }
    }
    *!/
})
router.delete('api/users/:id', ((req, res, next) => {
    // Expected:
    /!*
    {
        firstName: String,
        id: Primary key,
        image: String,
        middleName: String,
        permission: {
            chat: { C: Boolean, R: Boolean, U: Boolean, D: Boolean },
            news: { C: Boolean, R: Boolean, U: Boolean, D: Boolean },
            settings: { C: Boolean, R: Boolean, U: Boolean, D: Boolean }
        }
        surName: String,
        username: String
    }
    *!/
}))
/!* *!/

/!* News *!/
router.get('/api/news', (req, res, next) => {
    // Expected:
    /!*
    {
        id: Primary key,
        created_at: Date,
        text: String,
        title: String,
        user: {
            firstName: String,
            id: Key,
            image: String,
            middleName: String,
            surName: String,
            username: String
        }
    }
    *!/
})
router.post('/api/news', (req, res, next) => {
    // Expected:
    /!*
    {
        id: Primary key,
        created_at: Date,
        text: String,
        title: String,
        user: {
            firstName: String,
            id: Key,
            image: String,
            middleName: String,
            surName: String,
            username: String
        }
    }
    *!/
})
router.patch('/api/news/:id', (req, res, next) => {
    // Expected:
    /!*
    {
        id: Primary key,
        created_at: Date,
        text: String,
        title: String,
        user: {
            firstName: String,
            id: Key,
            image: String,
            middleName: String,
            surName: String,
            username: String
        }
    }
    *!/
})
router.delete('/api/news/:id', (req, res, next) => {
    // Expected:
    /!*
    {
        id: Primary key,
        created_at: Date,
        text: String,
        title: String,
        user: {
            firstName: String,
            id: Key,
            image: String,
            middleName: String,
            surName: String,
            username: String
        }
    }
    *!/
})
/!* *!/
module.exports = router*/
