"use client"

import { useFormStatus } from "react-dom"
import { type ComponentProps } from "react"

type Props = ComponentProps<"button"> & {
    pendingText?: string
}

export function SignUpButton ({children, pendingText, ...props }: Props){
    const {pending, action } = useFormStatus()
    const isPending = pending && action == props.formAction

    return <button {...props}>{isPending ? pendingText : children }</button> 
}