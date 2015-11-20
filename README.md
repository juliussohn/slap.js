# slap.js
Give your website a slap.
[View the demo](http://juliussohn.github.io/slap.js/example/)

##How to use
###Include the script

```html
<script src="path/to/jquery/jquery.min.js" type="text/javascript" ></script>
<script src="path/to/slap.js/jquery.slap.min.js" type="text/javascript" ></script>
```

###Initialize the plugin
```js
$(document).ready(function(){
	$(".myElement").slap();
})
```

##Options
| Name          | Description   | Type | Default|
| ------------- | ------------- |---------|----|
| pathToSlap    | The relative path to the plugin file and MP3 files  | String | "slap.js/dist/"  |
| slapDuration  | The duration of the slap animation  | Integer | 200 |
| slapIntensity | How much should the object be slapped? ( 1 = 360°) | Float | 1 |
| slapEasing    | The easing for the slap animation. For more information read the [jQueryUI easing page](https://jqueryui.com/easing/) | String | "swing" |

##Dependencies
* jQuery

##Changelog
