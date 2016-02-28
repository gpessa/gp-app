// 'use strict';
// angular.module("schemaForm").run(["$templateCache", function($templateCache) {
//
// angular.module('schemaForm').config(function(schemaFormProvider,  schemaFormDecoratorsProvider, sfPathProvider) {
//
//     var percentage = function(name, schema, options) {
//       if (schema.type === 'string' && (schema.format === 'percentage')) {
//         var f = schemaFormProvider.stdFormObj(name, schema, options);
//         f.key  = options.path;
//         f.type = 'percentage';
//         options.lookup[sfPathProvider.stringify(options.path)] = f;
//         return f;
//       }
//     };
//
//     schemaFormProvider.defaults.string.unshift(percentage);
//
//     //Add to the bootstrap directive
//     schemaFormDecoratorsProvider.addMapping(
//       'bootstrapDecorator',
//       'percentage',
//       'schema-form/template/percentage.html'
//     );
//
//     schemaFormDecoratorsProvider.createDirective(
//       'percentage',
//       'schema-form/template/percentage.html'
//     );
//   }
// );
