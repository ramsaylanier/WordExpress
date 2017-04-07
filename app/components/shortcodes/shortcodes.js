import {map} from 'lodash'
import React from 'react'

function GetShortCode(line) {
  const shortcodeObj = {
    shortcode: '',
    content: '',
    params: {}
  }

  // get shortcode from line (gets everything in between the first set of square brackets)
  shortcodeObj.shortcode = line.match(/\[([^\]]*)\]/g)[0].toString()

  // get content between the opening and closing shortcode tags
  shortcodeObj.content = line.match(/\](.*?)\[/g).toString().slice(1, -1)

  // get array of shortcode parameters
  const params = shortcodeObj.shortcode.match(/[\w-]+="[^"]*"/g)

  // turn params into key/value pairs
  map(params, param => {
    const arr = param.split('=')
    shortcodeObj.params[arr[0]] = arr[1].slice(1, -1)
  })

  return shortcodeObj
}

function RenderCaptionShortCode(line) {
  const shortcode = GetShortCode(line)
  const { params, content } = shortcode
  const { id, align, width} = params
  const img = content.match(/\<(.*?)\>/g).toString()
  const caption = content.match(/\/\>.+/g).toString().substr(2)
  return (
    '<figure id="' + id + '" class="' + align + '" style="width: ' + width + 'px">' +
    img +
    '<figcaption>' + caption + '</figcaption></figure>'
  )
}

function RenderGistShortCode(line) {
  const shortcode = GetShortCode(line)
  const { content } = shortcode
  return (
    '<div class="post--shortcode" data-type="gist" data-source="' + content + '"></div>'
  )
}

function RenderGistEmbed(shortcode) {
  const source = shortcode.dataset.source
  const gistFrame = document.createElement('iframe')
  gistFrame.setAttribute('width', '100%')
  gistFrame.id = 'gist-frame'

  const container = document.createElement('div')
  container.id = 'gist--container'

  const zone = shortcode.appendChild(container)
  zone.innerHTML = ''
  zone.appendChild(gistFrame)

	// Create the iframe's document
  const gistFrameHTML =
  `
    <html>
      <body">
        <script type="text/javascript" src="${source}"></script>
      </body>
    </html>
  `

  let gistFrameDoc = gistFrame.document

  if (gistFrame.contentDocument) {
    gistFrameDoc = gistFrame.contentDocument
  } else if (gistFrame.contentWindow) {
    gistFrameDoc = gistFrame.contentWindow.document
  }

  // opens the iframe document and writes the embed script, which then gets executed
  gistFrameDoc.open()
  gistFrameDoc.writeln(gistFrameHTML)
  gistFrameDoc.close()

  return gistFrameHTML
}

function RenderEmbed(shortcode) {
  const type = shortcode.dataset.type
  switch (type) {
  case 'gist':
    return RenderGistEmbed(shortcode)
    break

  default:
    break
  }
}

const Shortcodes = {
  caption: RenderCaptionShortCode,
  gist: RenderGistShortCode,
  renderEmbed: RenderEmbed
}

export default Shortcodes
