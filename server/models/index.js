const User = require('./schemas/user')
const News = require('./schemas/news')

module.exports.getUserByName = async (userName) => {
  return User.findOne({ userName })
}

module.exports.getUserById = async (id) => {
  return User.findById({ _id: id })
}

module.exports.createUser = async (data) => {
  const { username, surName, firstName, middleName, password } = data
  const newUser = new User({
    userName: username,
    surName,
    firstName,
    middleName,
    image: '',
    permission: {
      chat: { C: true, R: true, U: true, D: true },
      news: { C: true, R: true, U: true, D: true },
      settings: { C: true, R: true, U: true, D: true },
    },
  })
  newUser.setPassword(password)

  const user = await newUser.save()

  return user
}

module.exports.updateUser = async (data) => {
  const { userName, surName, firstName, middleName, oldPassword, newPassword } = data
  const currentUser = User.findOne({ userName })
  /*const newUser = new User({
    userName: username,
    surName,
    firstName,
    middleName,
    image: '',
    permission: {
      chat: { C: true, R: true, U: true, D: true },
      news: { C: true, R: true, U: true, D: true },
      settings: { C: true, R: true, U: true, D: true },
    },
  })
  newUser.setPassword(password)

  const user = await newUser.save()*/

  return user
}

module.exports.createNews = async (content) => {
  console.log('content', content)
  const { title, text, user } = content
  const newNews = new News ({
    title,
    text,
    user,
  })
  const news = await newNews.save()
  return news
}

module.exports.getNews = async () => {
  const news = await News.find({})
  return news
}

module.exports.updateNews = async (content) => {
  console.log('content', content)
  const { id, title, text } = content
  // const newsToEdit = News.findById({ _id: id })
  const updatedNews = await News.updateOne(
          { _id: id },
          {
            $set: {
             title,
              text
            }
          }
      )
  return updatedNews
}
