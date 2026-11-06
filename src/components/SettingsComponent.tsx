import { SettingsComponentProps } from '@ds-wizard/plugin-sdk/elements'
import { TextareaField } from '@ds-wizard/plugin-sdk/ui/Field'
import { Code } from '@ds-wizard/plugin-sdk/ui/Text'

import { SettingsData } from '@/data/settings-data'

export default function SettingsComponent({
    settings,
    onSettingsChange,
}: SettingsComponentProps<SettingsData>) {
    const rows = Math.min(12, Math.max(4, settings.extraKmPatterns.split('\n').length))

    return (
        <TextareaField
            label="Additional KM Patterns"
            rows={rows}
            value={settings.extraKmPatterns}
            onChange={(extraKmPatterns) => onSettingsChange({ ...settings, extraKmPatterns })}
            hint={
                <>
                    maDMP Importer works with Common DSW Knowledge Model (
                    <Code>dsw:root:^2.4.0</Code>) and Life Sciences DSW Knowledge Model{' '}
                    <Code>dsw:lifesciencies:^2.4.0</Code>. If you have knowledge models based on
                    these, you can add them here so that they can work with maDMP Importer as well.
                    Add one pattern per line.
                </>
            }
        />
    )
}
