import vine from '@vinejs/vine'

const VineSchema = vine.object({
  username: vine.string(),
  email: vine.string().email().minLength(10),
  phone:vine.string().minLength(8).maxLength(15),
  password: vine
    .string()
    .minLength(6)
    .maxLength(32)
    .confirmed()
})

export const UserUpdateSchema=vine.object({
  username: vine.string(),
  email: vine.string().email().minLength(10),
  phone:vine.string().minLength(8).maxLength(15),
})

export default VineSchema;


