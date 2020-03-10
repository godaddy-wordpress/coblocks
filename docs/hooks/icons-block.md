# Icon Block Settings

## Add additional icons

The CoBlocks Icon block now allows the use of custom icons by examining the directory of your active theme in search of SVG files. This documentation will explain the steps and requirements needed to upload custom icons to use with CoBlocks.

### Steps

1. You should create a directory and subdirectory within the root of your active theme/child theme as follows: 
`coblocks/icons/` 
eg: `wp-content/themes/twentytwenty/coblocks/icons`.
2. Drop your `.svg` icons into this directory.
  * See [SVG Requirements](#svg-requirements)
3. Optionally configure the icons
  * See [Optional Configuration File](#optional-configuration-file)
4. Check the icon block for your custom icons 🎉

### SVG requirements
SVG files used for custom icons may not contain XML markup. For example, we can look at this sample `.svg` file.

**Original**
```html
<?xml version="1.0" encoding="iso-8859-1"?>
<svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><circle class="inner-circle" cx="20" cy="20" r="8" stroke-width="8" stroke-dasharray="50.2655 50.2655" stroke-dashoffset="0"></circle></svg>
```

**Edited**
```html
<svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><circle class="inner-circle" cx="20" cy="20" r="8" stroke-width="8" stroke-dasharray="50.2655 50.2655" stroke-dashoffset="0"></circle></svg>
```

### Optional Configuration File
Your custom icons can be further configured by placing a config.json file within the `coblocks/icons` folder alongside your SVG icons. The configuration file will allow you to specify search keywords, labels, and outline style.

Example `config.json` file:
```json
{
    "adobe-photoshop": {
        "label": "Adobe Photoshop",
        "keywords": "adobe photoshop",
        "icon_outlined": "adobe-photoshop-outlined.svg"
    },
    "apple-logo": {
        "label": "Apple Logo",
        "keywords": "apple logo",
        "icon_outlined": "apple-logo-outlined.svg"
    },
    "chrome": {
        "label": "Chrome",
        "keywords": "chrome web browser",
        "icon_outlined": "chrome-outlined.svg"
    },
    "mac-logo": {
        "label": "Mac Logo",
        "keywords": "mac logo computer",
        "icon_outlined": "mac-logo-outlined.svg"
    }
}
```

## Disable bundled CoBlocks icons

The following `PHP` filter can be used to remove the CoBlocks bundled icons.  

```php
add_filter( 'coblocks_bundled_icons_enabled', '__return_false' );
```
