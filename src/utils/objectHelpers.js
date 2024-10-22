export function deepMerge(target, source) {
  for (let key in source) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }
  return { ...target, ...source };
}

export function getFinalUrl(values) {
  const params = values?.params
    ?.filter((param) => param.key)
    .map((param) => `${param.key}=${param.value}`)
    .join('&');

  if (params && values?.enableParams) {
    return values?.url + `?${params}`;
  } else {
    return values?.url;
  }
}
