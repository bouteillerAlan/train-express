import bcrypt from "bcrypt";

// todo: we can also set a var env for the salt value if we want
export const getHash = async (value) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(value, salt);
}
