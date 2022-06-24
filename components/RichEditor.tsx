import React from 'react'
import { RichTextEditor } from '@mantine/rte'

export default function RichTextEditors({ body, changeBody }: any) {

    return (
        <RichTextEditor

            autoCorrect="true"
            value={body}
            onChange={changeBody}
            spellCheck='true'
            radius={'sm'}
            sticky={true}

        />
    )
}