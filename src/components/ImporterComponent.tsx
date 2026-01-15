import { ChangeEvent, useState } from 'react'
import { ProjectImporterComponentProps } from '@ds-wizard/plugin-sdk/elements'
import { ProjectImporter } from '@ds-wizard/plugin-sdk/project-importer'
import { SettingsData } from '../data/settings-data'
import { importMaDMP } from '../importer/madmp-importer'

export default function ImporterComponent({
    onImport,
}: ProjectImporterComponentProps<SettingsData, null>) {
    const [error, setError] = useState<string | null>(null)

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (e) => {
            try {
                const content = e.target?.result
                if (typeof content !== 'string') {
                    throw new Error('File content is not a string')
                }

                const json = JSON.parse(content)
                const importer = new ProjectImporter()

                importMaDMP(importer, json)

                setError(null)
                onImport(importer.getEvents())
            } catch {
                setError(
                    'Error reading or parsing file. Make sure you selected a valid JSON document.',
                )
            }
        }
        reader.readAsText(file)
    }

    return (
        <div className="col col-detail mx-auto">
            <div id="importer">
                <div className="mb-3">
                    <h2>maDMP Importer</h2>
                </div>
                <div className="mb-3">
                    {error && (
                        <div id="error">
                            <div className="alert alert-danger" role="alert" id="error-alert">
                                {error}
                            </div>
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="file-input" className="form-label">
                            Select maDMP (JSON)
                        </label>
                        <input
                            type="file"
                            id="file-input"
                            accept="application/json"
                            className={`form-control${error ? ' is-invalid' : ''}`}
                            onChange={handleFileChange}
                        />
                        <p className="mt-2 text-muted">
                            Choose a machine-actionable Data Management Plan in JSON format that
                            conforms to the{' '}
                            <a
                                href="https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard"
                                target="_blank"
                            >
                                RDA DMP Common Standard
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
