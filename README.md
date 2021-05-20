# Scalable CSS

[PostCSS] plugin to scale (up/down) css numerical values.

[PostCSS]: https://github.com/postcss/postcss
[≡ Mod(N)]: https://modn.xyz

# Example

#### Input:
```css
.foo {
    height: 100px;
}
```
Reduced by 50%:
#### Output:
```css
.foo {
  height: 50px;
}
```

## Installation
```
npm i @modnxyz/scalablecss
```
- The package is available on both NPM and Github registry.
## Usage
`ScalableCSS` takes one argument, which is javascript object:
```js
options = {
  // required options 
  percent: (1/2)*100,// scaling percent, e.g. 50%
  // optional options
  declares:['min-height','height'] // an array of declares, the scaling will apply **only** to it.
  // the default value: 
  // ['min-height','min-width','left','top','width','height','margin', 'padding', 'font-size', 'line-height', 'transform'];
}

// Then embed it into your project.
scalableCSS(options)
```

See [PostCSS] docs for examples related to your environment.

## TODO
- [ ] Refactoring.
- [ ] Implement `cli` version.
- [ ] Scale `functions` numerical values, e.g. scale down `translate(100px)` to `translate(50px)`.

## Credit & License
- **Author:** Fares AlHarbi, [≡ Mod(N)].
- **License:** MIT license, 2021 ≡ Mod(N), all rights reserved.
