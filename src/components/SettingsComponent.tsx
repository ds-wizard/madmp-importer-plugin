import React from 'react'
import { SettingsData } from '@/data/settings-data'
import { SettingsComponentProps } from '@ds-wizard/plugin-sdk/elements'

export default function SettingsComponent({
    settings,
    onSettingsChange,
}: SettingsComponentProps<SettingsData>) {
    const rows = Math.min(12, Math.max(4, settings.extraKmPatterns.split('\n').length))

    return (
        <div>
            <div className="form-group">
                <label>Additional KM Patterns:</label>
                <textarea
                    className="form-control"
                    rows={rows}
                    value={settings.extraKmPatterns}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        onSettingsChange({ ...settings, extraKmPatterns: e.target.value })
                    }
                />
                <p className="text-muted mt-2">
                    maDMP Importer works with Common DSW Knowledge Model (
                    <code>dsw:root:^2.4.0</code>) and Life Sciences DSW Knowledge Model{' '}
                    <code>dsw:lifesciencies:^2.4.0</code>. If you have knowledge models based on
                    these, you can add them here so that they can work with maDMP Importer as well.
                    Add one pattern per line.
                </p>
            </div>
        </div>
    )
}
