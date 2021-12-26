module.exports.serializeUser = (user) => {
    return {
      firstName: user.firstName,
      id: user._id,
      image: user.image,
      middleName: user.middleName,
      permission: user.permission,
      surName: user.surName,
      username: user.userName,
    }
}

module.exports.serializeNews = (news) => {
    if (!news.length) {
        return {
            title: news.title,
            text: news.text,
            id: news._id,
            created_at: news.created_at,
            user: {
                image: news.user.image,
                username: news.user.userName,
            }
        }
    }
    return news.map((newsItem) => ({
        title: newsItem.title,
        text: newsItem.text,
        id: newsItem._id,
        created_at: newsItem.created_at,
        user: {
            image: newsItem.user.image,
            username: newsItem.user.userName,
        }
    }))
}
