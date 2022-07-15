/* eslint-disable no-undef */
import find from 'lodash/find'
import remove from 'lodash/remove'
import postCurrentHeartbeats from './api/postCurrentHeartbeats'

chrome.tabs.onRemoved.addListener(async (id, removed) => {
  const tabs = (await chrome.storage.local.get('wakapi-tabs'))['wakapi-tabs'] || []
  const setting = (await chrome.storage.local.get('wakapi-settings'))['wakapi-settings'] || {}
  const existingTab = find(tabs, { id })
  if (existingTab) {
    // Add heatbead
    // const timeOntab = (Date.now() - existingTab.timestamp) / 1000
    postCurrentHeartbeats(setting.server, setting.token, existingTab.hostname, existingTab.timestamp)
    remove(tabs, (tab: any) => tab.id === existingTab.id)
  }
})

chrome.tabs.onUpdated.addListener(async (id, info) => {
  try {
    if (info.url) {
      const url = new URL(info.url || '')
      const tabs = (await chrome.storage.local.get('wakapi-tabs'))['wakapi-tabs'] || []
      const setting = (await chrome.storage.local.get('wakapi-settings'))['wakapi-settings'] || {}
      const existingTab = find(tabs, { id })
      if (existingTab) {
        // const timeOntab = (Date.now() - existingTab.timestamp) / 1000
        postCurrentHeartbeats(setting.server, setting.token, existingTab.hostname, existingTab.timestamp)
        remove(tabs, (tab: any) => tab.id === existingTab.id)
      }
      chrome.storage.local.set({
        'wakapi-tabs': [
          ...tabs,
          {
            hostname: url.hostname,
            id,
            timestamp: Date.now()
          }
        ]
      })
    }
  } catch (error) {
    console.error(info.url, error)
  }
})
