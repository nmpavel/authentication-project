export function urlSlug(title: any) {
    let slug: any;

    // Convert to lower case
    slug = title.toLowerCase();

    // Remove special characters
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\?|\>|\<|\'|\"|\:|\;|_/gi, '');

    // Replace spaces with dash symbols
    slug = slug.replace(/ /gi, "-");

    // Replace forward slash with dash symbols
    slug = slug.replace(/\//gi, "-");

    // Replace dot with dash symbols
    slug = slug.replace(/\./gi, "-");

    // Remove consecutive dash symbols 
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');

    // Remove the unwanted dash symbols at the beginning and the end of the slug
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');

    return slug;
}