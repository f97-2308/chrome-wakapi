import React, { useEffect, useState } from 'react'
import { Button, Form, Grid, Header, Image, Segment, Loader, Dimmer } from 'semantic-ui-react'
import { useSettingsStore } from './hooks/useSettingsStore'
import { toast, SemanticToastContainer } from 'react-semantic-toasts'
import { createRoot } from 'react-dom/client'

const Options = () => {
  const [settings, setSettings] = useSettingsStore()
  const [server, setServer] = useState('')
  const [token, setToken] = useState('')

  useEffect(() => {
    setServer(settings.server)
    setToken(settings.token)
  }, [JSON.stringify(settings)])

  const saveSeting = () => {
    if (!server || !token) {
      toast({
        type: 'error',
        icon: 'envelope',
        title: 'Cannot save setting',
        description: 'Please enter valid data...',
        time: 5000
      })
    } else {
      setSettings({ server, token })
      toast({
        type: 'success',
        icon: 'save',
        title: 'Save success',
        description: 'Thanks you, it will working if your setting valid!',
        time: 2000
      })
    }
  }
  return (
    <>
      <SemanticToastContainer />
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' style={{ color: '#34835b' }} textAlign='center'>
            <Image src='https://wakapi.dev/assets/images/android-chrome-192x192.png' /> wakapi options
          </Header>
          <Segment>
          <Dimmer active={!settings.server} inverted>
            <Loader />
          </Dimmer>
          <Form size='large'>
            <Form.Input
              fluid
              icon='server'
              iconPosition='left'
              placeholder='Your wakapi server [https://wakapi.dev]'
              value={server}
              onChange={(e) => setServer(e.target.value)}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Your key [4ff04f01-3ffa-4258-3411-3ee4ebb7c70e]'
              type='password'
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
            <Button style={{ backgroundColor: '#34835b', color: '#ffffff' }} fluid size='large' onClick={() => saveSeting()}>
              Save
            </Button>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  </>
  )
}

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <Options />
)
