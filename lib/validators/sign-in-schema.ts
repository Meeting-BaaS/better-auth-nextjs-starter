import { object, boolean } from "yup"

export const SignInSchema = object({
    termsOfUse: boolean().required().oneOf([true], "Please agree to the terms of use"),
    privacyPolicy: boolean().required().oneOf([true], "Please consent to the privacy policy")
})
