import _ from 'lodash';

function GetShortCode(line){
  let shortcodeObj = {
    shortcode: '',
    content: '',
    params: {}
  };

  //get shortcode from line (gets everything in between the first set of square brackets)
  shortcodeObj.shortcode = line.match(/\[([^\]]*)\]/g)[0].toString();

  //get content between the opening and closing shortcode tags
  shortcodeObj.content = line.match(/\](.*?)\[/g).toString().slice(1, -1);

  //get array of shortcode parameters
  const params = shortcodeObj.shortcode.match(/[\w-]+="[^"]*"/g);

  //turn params into key/value pairs
  _.map(params, param => {
    console.log(param);
    const arr = param.split('=');
    console.log(arr[1])
    shortcodeObj.params[arr[0]] = arr[1].slice(1,-1);
  })

  return shortcodeObj;
}

function RenderCaptionShortCode(line){
  const shortcode = GetShortCode(line);
  const { params, content } = shortcode;
  const { id, align, width} = params;
  const img = content.match(/\<(.*?)\>/g).toString();
  const caption = content.match(/\/\>.+/g).toString().substr(2);
  return (
    '<figure id="' + id + '" class="' + align + '" style="width: ' + width + 'px">' +
    img +
    '<figcaption>' + caption + '</figcaption></figure>'
  );
}

const Shortcodes = {
  caption: RenderCaptionShortCode
}

export default Shortcodes;
