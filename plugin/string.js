export default function stringCleanPlugin(schema, options) {
  const { fields = [], trim = true, lowercase = true } = options;

  fields.forEach((field) => {
    const path = schema.path(field);
    if (path && path.instance === "String") {
      if (trim) path.options.trim = true;
      if (lowercase) path.options.lowercase = true;
    }
  });
}
