import { Plugin } from '@ds-wizard/plugin-sdk/types'
import { SettingsData, SettingsDataCodec } from './data/settings-data'
import { PluginBuilder } from '@ds-wizard/plugin-sdk/core'
import { pluginMetadata } from './metadata'
import { makeNullCodec } from '@ds-wizard/plugin-sdk'
import ImporterComponent from './components/ImporterComponent'
import SettingsComponent from './components/SettingsComponent'

export default function (settingsInput: unknown, _userSettingsInput: unknown): Plugin {
    const settings = SettingsDataCodec.parseOrInit(settingsInput)

    const plugin: Plugin = PluginBuilder.create(pluginMetadata, SettingsDataCodec, makeNullCodec())
        .addProjectImporter(
            'maDMP Importer',
            'madmp-importer',
            'x-madmp-importer',
            ImporterComponent,
            ['dsw:root:^2.4.0', 'dsw:lifesciencies:^2.4.0'].concat(parseExtraKmPatterns(settings)),
        )
        .addSettings('x-madmp-importer-settings', SettingsComponent)
        .createPlugin()

    return plugin
}

function parseExtraKmPatterns(settings: SettingsData): string[] {
    if (!settings.extraKmPatterns) {
        return []
    }

    return settings.extraKmPatterns
        .split(/[,\n]/)
        .map((name) => name.trim())
        .filter(Boolean)
}
