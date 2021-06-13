export default (baseUrl, {
  path,
  title,
  description,
  image,
}) => {
  const meta = [];

  meta.push({
    property: 'og:url',
    content: baseUrl + (path || ''),
  });

  if (title) {
    meta.push(
      {
        name: 'title',
        content: title,
      },
      {
        property: 'og:title',
        content: title,
      },
    );
  }

  if (description) {
    meta.push(
      {
        name: 'description',
        content: description,
      },
      {
        property: 'og:description',
        content: description,
      },
    );
  }

  if (image) {
    meta.push({
      property: 'og:image',
      content: image,
    });

    meta.push({
      name: 'twitter:image',
      content: baseUrl + image,
    });

    meta.push({
      name: 'twitter:card',
      content: 'summary_large_image',
    });
  }

  meta.push({
    name: 'twitter:creator',
    content: '@baruchiro',
  });

  meta.push({
    name: 'author',
    content: 'Baruch Odem',
  });

  return meta;
};
