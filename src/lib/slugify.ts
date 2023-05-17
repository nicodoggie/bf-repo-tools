import slugify from 'slugify';

export default function (str: string) {
  const slugifyCall = slugify as unknown as typeof slugify.default;
  return slugifyCall(str, {
    replacement: '-',
    lower: true,
    remove: /['"]/,
  });
}