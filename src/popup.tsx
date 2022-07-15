import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Message, Icon, Menu, Segment, Button, Grid, Dropdown } from 'semantic-ui-react'
import { useSettingsStore } from './hooks/useSettingsStore'
import getCurrentToday from './api/getCurrentToday'
import getCurrentUser from './api/getCurrentUser'

const Popup = () => {
  const [settings] = useSettingsStore()
  const [server, setServer] = useState('')
  const [token, setToken] = useState('')
  const [today, setToday] = useState({ grand_total: { text: '' } })
  const [user, setUser] = useState({ id: 0, display_name: '' })

  useEffect(() => {
    setServer(settings.server)
    setToken(settings.token)
  }, [JSON.stringify(settings)])

  useEffect(() => {
    if (server && token) {
      getToday()
      getUser()
    }
  }, [server, token])

  const getToday = async () => {
    const today = await getCurrentToday(server, token)
    setToday(today.data)
  }

  const getUser = async () => {
    const user = await getCurrentUser(server, token)
    setUser(user.data)
  }

  return (
    <div>
      <Menu attached='top'>
        <Menu.Item header>Wakapi Chrome</Menu.Item>
        <Menu.Menu position='right'>
          <Dropdown item icon='wrench'>
            <Dropdown.Menu>
              <Dropdown.Item icon='filter' text='Custom rules' onClick={() => window.open('https://wakatime.com/settings/rules', '_blank')} />
              <Dropdown.Item icon='dashboard' text='Dashboard' onClick={() => window.open('https://wakatime.com/dashboard', '_blank')} />
              <Dropdown.Item icon='universal access' text='About' onClick={() => window.open('https://github.com/f97/chrome-wakapi', '_blank')} />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>

      {!token
        ? (
          <Segment attached='bottom'>
            <Message warning>
              <p>
                You need to click <a href="/options.html" target={'_blank'}>OPTIONS</a> to login!
              </p>
            </Message>
          </Segment>
          )
        : (
      <Segment attached='bottom'>
        <Message positive>
          <p>
            Signed in as <b>{user?.id}</b> ({user?.display_name})
          </p>
        </Message>
        <Message icon>
          <Icon name='circle notched' loading />
          <Message.Content>
            <Message.Header>{today?.grand_total?.text}</Message.Header>
            TOTAL TIME LOGGED TODAY
          </Message.Content>
        </Message>

        <Grid centered columns={2}>
          <Button icon labelPosition='left' color='red' style={{ margin: '10px 0' }} disabled>
            <Icon name='pause' />
            Disable Logging
          </Button>
        </Grid>

        <Menu vertical fluid>
          <Menu.Item
            name='options'
            onClick={() => window.open('/options.html', '_blank')}
          >
            <Icon name='setting' />
            Options
          </Menu.Item>

          <Menu.Item
            name='logout'
          >
            <Icon name='arrow right' />
            Logout
          </Menu.Item>
        </Menu>
      </Segment>)}

    </div>
  )
}

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <Popup />
)
