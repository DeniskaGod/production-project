type Mods = Record<string, boolean | string>;
const obj: Mods = {
  hovered: true,
  active: false,
};

export function classNames(
  cls: string,
  mods: Mods = {},
  additional: string[] = [],
): string {
  return [
    cls,
    ...additional.filter(Boolean),
    ...Object.entries(mods)
      .filter(([_, value]) => Boolean(value))
      .map(([className]) => className),
  ]
    .join(' ')
    .trim();
}

classNames('someClass', { hovered: true, active: false }, [
  'additionalClass1',
  'additionalClass2',
]);
