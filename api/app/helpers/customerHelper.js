exports.setUserInfo = function setUserInfo(request) {

  const getUserInfo = {
    _id: request._id,
    profile: {
      firstName: capitalize(request.profile.firstName),
      lastName: capitalize(request.profile.lastName),
      nickName: getNickName(request.profile.firstName, request.profile.lastName),
      gender: request.profile.gender,
      rangeAge: request.profile.rangeAge,
      level: request.profile.level,
      about: request.profile.about,
    },
    provider: request.provider,
    config: request.config,
    media: request.media,

    email: request.email,
    role: request.role,
  };


  return getUserInfo;

};