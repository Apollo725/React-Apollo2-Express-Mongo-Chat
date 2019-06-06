const isObject = () => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new UserInputError(`${id} is not a valid user ID.`)
  }
  return true
}