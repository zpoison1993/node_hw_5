const validate = (fields, files) => {
    if (files.photo.name === '' || files.photo.size === 0) {
        return { status: 'Не удалось добавить файл', error: true }
    }
    return { status: 'Ok', error: false }
}
module.exports = {
    validate,
}
