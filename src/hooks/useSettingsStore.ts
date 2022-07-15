import { createChromeStorageStateHookLocal } from 'use-chrome-storage'

const SETTINGS_KEY = 'wakapi-settings'

export const INITIAL_VALUE = {
  server: 'https://wakapi.dev',
  token: ''
}

export const useSettingsStore = createChromeStorageStateHookLocal(SETTINGS_KEY, INITIAL_VALUE)
