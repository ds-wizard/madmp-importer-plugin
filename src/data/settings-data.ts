import { z } from 'zod'
import { makeJsonCodec } from '@ds-wizard/plugin-sdk/utils'

// Define the plugin settings data here or delete if not needed

export const SettingsDataSchema = z.object({
    extraKmPatterns: z.string(),
})

export type SettingsData = z.infer<typeof SettingsDataSchema>

export const DefaultSettingsData: SettingsData = {
    extraKmPatterns: '',
}

export const SettingsDataCodec = makeJsonCodec(SettingsDataSchema, DefaultSettingsData)
