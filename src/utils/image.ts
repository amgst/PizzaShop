/**
 * Utility to get the correct URL for a product image.
 * If the path starts with http, https, or /, it's treated as a full URL or absolute path.
 * Otherwise, it's assumed to be a filename in the /public/products/ directory.
 */
export const getProductImageUrl = (path: string | undefined): string => {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('/')) {
        return path;
    }
    return `/products/${path}`;
};
