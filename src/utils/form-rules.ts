import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

type Rules = {
  [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions
}

export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Email là bắt buộc'
    },
    pattern: {
      value:
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g,
      message: 'Email không đúng định dạng'
    },
    minLength: {
      value: 5,
      message: 'Độ dài email từ 5 - 160 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài email từ 5 - 160 ký tự'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password là bắt buộc'
    },
    minLength: {
      value: 6,
      message: 'Độ dài password từ 6 - 16 ký tự'
    },
    maxLength: {
      value: 16,
      message: 'Độ dài password từ 6 - 16 ký tự'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Nhập lại password là bắt buộc'
    },
    minLength: {
      value: 6,
      message: 'Độ dài password từ 6 - 16 ký tự'
    },
    maxLength: {
      value: 16,
      message: 'Độ dài password từ 6 - 16 ký tự'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Nhập lại pasword không khớp'
        : undefined
  }
})

export const schema = yup
  .object({
    email: yup
      .string()
      .required('Email là bắt buộc')
      .email('Email không đúng định dạng')
      .min(5, 'Độ dài email từ 5 - 160 ký tự')
      .max(160, 'Độ dài email từ 5 - 160 ký tự'),
    password: yup
      .string()
      .required('Password là bắt buộc')
      .min(6, 'Độ dài password từ 6 - 16 ký tự')
      .max(16, 'Độ dài password từ 6 - 16 ký tự'),
    confirm_password: yup
      .string()
      .required('Nhập lại password là bắt buộc')
      .min(6, 'Độ dài password từ 6 - 16 ký tự')
      .max(16, 'Độ dài password từ 6 - 16 ký tự')
      .oneOf([yup.ref('password')], 'Nhập lại pasword không khớp')
  })
  .required()

export type Schema = yup.InferType<typeof schema>
