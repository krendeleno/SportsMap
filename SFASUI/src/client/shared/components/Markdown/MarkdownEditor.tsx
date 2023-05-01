import { MDEditorProps } from '@uiw/react-md-editor';
import { useField } from 'formik';
import dynamic from 'next/dynamic';
import React, { useCallback, useLayoutEffect, useState, FC } from 'react';

import { Field } from 'src/client/shared/components/Field';

import styles from './MarkdownEditor.module.css';
import './MarkdownEditor.css';

export type MarkdownEditorProps = {
    className?: string;
    controlClassName?: string;
    fieldName: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
};

const MDEditor = dynamic<MDEditorProps>(() => import('@uiw/react-md-editor').then((mod) => mod.default), {
    ssr: false,
});

export const MarkdownEditor: FC<MarkdownEditorProps> = (props) => {
    const { fieldName, label, required = false, disabled = false, placeholder } = props;
    const [field, meta] = useField(fieldName);

    const showError = Boolean(meta.touched) && Boolean(meta.error);

    const [value, setValue] = useState(field.value);

    useLayoutEffect(() => {
        setValue(field.value);
    }, [field.value]);

    const handleChangeValue = useCallback(
        (updatedValue?: string) => {
            setValue(updatedValue);

            field.onChange({ target: { name: fieldName, value: updatedValue } });
        },
        [field, fieldName]
    );

    return (
        <Field
            htmlFor={fieldName}
            label={label}
            required={required}
            error={showError ? meta.error : undefined}
        >
            <MDEditor
              preview="edit"
              className={styles['MarkdownEditor']}
              textareaProps={{
                    name: fieldName,
                    disabled,
                    required,
                    onBlur: field.onBlur,
                    placeholder,
                }}
                value={value}
                onChange={handleChangeValue}
                lang='ru'
            />
        </Field>
    );
};
