import { ProjectImporterComponentProps } from '@ds-wizard/plugin-sdk/elements'
import { SimpleFileImporter } from '@ds-wizard/plugin-sdk/ui/SimpleFileImporter'

import { SettingsData } from '../data/settings-data'
import { importMaDMP } from '../importer/madmp-importer'

export default function ImporterComponent({
    onImport,
}: ProjectImporterComponentProps<SettingsData, null>) {
    return (
        <SimpleFileImporter
            onImport={onImport}
            heading="Import maDMP"
            label="Select maDMP (JSON)"
            description={
                <p>
                    Choose a machine-actionable Data Management Plan in JSON format that conforms to
                    the{' '}
                    <a
                        href="https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard"
                        target="_blank"
                    >
                        RDA DMP Common Standard
                    </a>
                    .
                </p>
            }
            importData={(importer, json, _km) => {
                importMaDMP(importer, json)
            }}
        />
    )
}
