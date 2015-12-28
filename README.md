# inline-ts
Transpiles inline typescript code into javascript.

### Install
```sh
npm install inline-ts
```

### Example
Taking an html input file
```html
<div>
  <h1>Some content!</h1>
  <p>Look at this glorious content</p>
</div>
<script type="text/typescript">
  class TypeScriptClass extends SomeOtherClass {
    test(a: string) {
      console.log("I work! Hey", a);
    }
  }
</script>
```

Transpiles to
```html
<div>
  <h1>Some content!</h1>
  <p>Look at this glorious content</p>
</div>
<script type="text/javascript">
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TypeScriptClass = (function (_super) {
    __extends(TypeScriptClass, _super);
    function TypeScriptClass() {
        _super.apply(this, arguments);
    }
    TypeScriptClass.prototype.test = function (a) {
        console.log("I work! Hey", a);
    };
    return TypeScriptClass;
})(SomeOtherClass);

</script>
```

### Usage
Single file
```typescript
import transpile from "inline-ts";
transpile(inputFile, outputFile, options);
```

Whole directory
```typescript
import transpileDirectory from "inline-ts";
transpileDirectory(inputDir, outputDir, options);
```
