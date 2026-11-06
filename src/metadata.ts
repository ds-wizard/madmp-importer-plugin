import { PluginMetadata } from '@ds-wizard/plugin-sdk/types'

import pkg from '../package.json' with { type: 'json' }

export const pluginMetadata: PluginMetadata = {
    uuid: '434b554b-0ba1-4272-b070-5682a1e13726',
    name: 'maDMP Importer',
    description: 'Importer for maDMPs according to RDA DMP Common Standard.',
    version: pkg.version,
}
