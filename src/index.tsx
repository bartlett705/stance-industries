/** @jsx jsx */
import * as dotenv from 'dotenv'
dotenv.config()
import { jsx } from '@emotion/core'
import { renderToStaticMarkup } from 'react-dom/server'
import { renderStylesToString } from 'emotion-server'
import { mkdirSync, writeFileSync, copyFileSync } from 'fs'
import * as rimraf from 'rimraf'
import * as path from 'path'
import { Index, Services, Contact } from './pages'
import { PageComponent } from './site'
import * as recursiveCopy from 'recursive-copy'

const BUILD_PATH = path.join(__dirname, '../', 'build')
const PUBLIC_PATH = path.join(__dirname, '../', 'public')

console.log('Removing build directory: ', BUILD_PATH)
rimraf.sync(BUILD_PATH)
console.log('Creating new build directory.')
mkdirSync(BUILD_PATH)
console.log('Copying public static files.')
recursiveCopy(PUBLIC_PATH, BUILD_PATH, { expand: true, dot: true })
  .on(recursiveCopy.events.COPY_FILE_START, function(copyOperation: any) {
    console.info('Copying file ' + copyOperation.src + '...')
  })
  .on(recursiveCopy.events.ERROR, function(error: any, copyOperation: any) {
    console.error('Unable to copy ' + copyOperation.dest)
  })
  .then(function(results: any[]) {
    console.info(results.length + ' file(s) copied')
    renderPages()
  })
  .catch(function(error: Error) {
    return console.error('Copy failed: ' + error)
  })

type PageEntry = {
  component: PageComponent
  path: string
}

const manifest: PageEntry[] = [
  { component: Index, path: 'index.html' },
  { component: Services, path: 'services.html' },
  { component: Contact, path: 'contact.html' }
]

function renderPages() {
  for (const page of manifest) {
    console.log(`Rendering Markup for ${page.path}`)
    const markup = renderStylesToString(
      renderToStaticMarkup(<page.component currentPath={page.path} />)
    )
    console.log(`Writing Markup to ${path.join(BUILD_PATH, page.path)}`)
    writeFileSync(path.join(BUILD_PATH, page.path), markup)
  }
  console.log('Done!')
}
