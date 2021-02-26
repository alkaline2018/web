import { FormControl, FormErrorMessage, FormLabel, Input, Textarea } from '@chakra-ui/react';
import { useField } from 'formik';
import React, { InputHTMLAttributes, TextareaHTMLAttributes, HTMLAttributes } from 'react';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
    textarea?: boolean;
}

// type InputFieldProps = HTMLAttributes<HTMLInputElement> & {
//     label: string;
//     name: string;
//     textarea?: boolean;
//     size?: string;
// }


// '' => false
// 'error message stuff => true

export const InputField: React.FC<InputFieldProps> = ({ label, textarea, size: _, ...props }) => {
    // let InputOrTextarea = Input
    // if (textarea) {
    //     InputOrTextarea = Textarea
    // }
    const [field, { error, }] = useField(props);
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            {/* 개편 이후 뭔가 이상함 */}
            {textarea
                ? <Textarea {...field} id={field.name} />
                : <Input {...field} {...props} id={field.name} />
            }
            {/* <InputOrTextarea {...field} {...props} id={field.name} /> */}
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    );
}