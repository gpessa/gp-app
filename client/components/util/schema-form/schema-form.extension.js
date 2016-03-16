angular
  .module('schemaForm')
  .config(function(schemaFormProvider,  schemaFormDecoratorsProvider, sfPathProvider) {

    var range = function(name, schema, options) {
      if ((schema.format === 'dimension')) {
        var f = schemaFormProvider.stdFormObj(name, schema, options);
        f.key  = options.path;
        f.type = 'range';
        options.lookup[sfPathProvider.stringify(options.path)] = f;
        return f;
      }
    };

    schemaFormProvider.defaults.string.unshift(range);

    schemaFormDecoratorsProvider.addMapping(
      'bootstrapDecorator',
      'range',
      '/components/util/schema-form/schema-form-dimension.html'
    );

    schemaFormDecoratorsProvider.createDirective(
      'range',
      '/components/util/schema-form/schema-form-dimension.html'
    );

  });
