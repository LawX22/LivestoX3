export interface SignUpForm {
  firstName: string
  lastName: string
  username: string
  email: string
  phoneNumber: string
  gender: string
  password: string
  confirmPassword: string
  verificationCode: string
}

export const defaultSignUpForm: SignUpForm = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  phoneNumber: '',
  gender: '',
  password: '',
  confirmPassword: '',
  verificationCode: ''
}
