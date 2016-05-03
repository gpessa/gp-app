// 'use strict';
//
// angular
//   .module("schemaForm")
//   .run(function($templateCache) {
//
//   })
//   .config(function(schemaFormProvider,  schemaFormDecoratorsProvider, sfPathProvider) {
//
//     var range = function(name, schema, options) {
//       if (schema.type === 'string' && (schema.format === 'range')) {
//         var f = schemaFormProvider.stdFormObj(name, schema, options);
//         f.key  = options.path;
//         f.type = 'range';
//         options.lookup[sfPathProvider.stringify(options.path)] = f;
//         return f;
//       }
//     };
//
//     schemaFormProvider.defaults.string.unshift(range);
//
//     schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'range', 'components/schema-form/range.html');
//     schemaFormDecoratorsProvider.createDirective('range','components/schema-form/range.html');
//
//   });
