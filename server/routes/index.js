const express = require('express')
const router = express.Router()

/* Authentication */
router.post('/api/registration', (req, res, next) => {
    // Expected:
    /*
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
    */
})
router.post('/api/login', (req, res, next) => {
    // Expected:
    /*
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
    */
})
router.post('/api/refresh-token', (req, res, next) => {
    // Expected:
    /*
    {
        accessToken: String,
            refreshToken: String,
        accessTokenExpiredAt: Date (ms),
        refreshTokenExpiredAt: Date (ms)
    }
    */
})
/* */

/* Profile */
router.get('/api/profile', (req, res, next) => {
    // Expected:
    /*
    {
        firstName: String,
        middleName: String,
        surName: String,
        oldPassword: String,
        newPassword: String,
        avatar: File
    }
    */
})
router.patch('/api/profile', (req, res, next) => {
    // Expected:
    /*
    {
        firstName: String,
        middleName: String,
        surName: String,
        oldPassword: String,
        newPassword: String,
        avatar: File
    }
    */
})
/* */

/* Users */
router.get('/api/users', (req, res, next) => {
    // Expected:
    /*
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
    */
})
router.patch('/api/users/:id/permission', (req, res, next) => {
    // Expected:
    /*
    {
        permission: {
            chat: { C: Boolean, R: Boolean, U: Boolean, D: Boolean },
            news: { C: Boolean, R: Boolean, U: Boolean, D: Boolean },
            settings: { C: Boolean, R: Boolean, U: Boolean, D: Boolean }
        }
    }
    */
})
router.delete('api/users/:id', ((req, res, next) => {
    // Expected:
    /*
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
    */
}))
/* */

/* News */
router.get('/api/news', (req, res, next) => {
    // Expected:
    /*
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
    */
})
router.post('/api/news', (req, res, next) => {
    // Expected:
    /*
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
    */
})
router.patch('/api/news/:id', (req, res, next) => {
    // Expected:
    /*
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
    */
})
router.delete('/api/news/:id', (req, res, next) => {
    // Expected:
    /*
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
    */
})
/* */
module.exports = router
