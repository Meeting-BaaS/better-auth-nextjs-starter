import { object, boolean, type InferType } from "yup"

export const SignUpSchema = object({
    termsOfUse: boolean().required().oneOf([true], "Please agree to the terms of use"),
    privacyPolicy: boolean().required().oneOf([true], "Please consent to the privacy policy")
})

export type SignUpFormData = InferType<typeof SignUpSchema>
