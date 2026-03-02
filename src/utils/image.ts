import type { SyntheticEvent } from 'react';

/**
 * Utility to get the correct URL for a product image.
 * If the path starts with http, https, or /, it's treated as a full URL or absolute path.
 * Otherwise, it's assumed to be a filename in the /public/products/ directory.
 */
export const getProductImageUrl = (path: string | undefined): string => {
    if (!path) return '';
    const normalizedPath = path.trim();
    if (
        normalizedPath.startsWith('http') ||
        normalizedPath.startsWith('/') ||
        normalizedPath.startsWith('data:') ||
        normalizedPath.startsWith('blob:')
    ) {
        return normalizedPath;
    }
    if (normalizedPath.startsWith('products/')) {
        return `/${normalizedPath}`;
    }
    return `/products/${normalizedPath}`;
};

export const PRODUCT_IMAGE_FALLBACK =
    'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22 viewBox=%220 0 400 300%22%3E%3Crect width=%22400%22 height=%22300%22 fill=%22%23f5f1ec%22/%3E%3Ccircle cx=%22130%22 cy=%22110%22 r=%2242%22 fill=%22%23f27d26%22 fill-opacity=%220.25%22/%3E%3Ccircle cx=%22235%22 cy=%22155%22 r=%2260%22 fill=%22%23f27d26%22 fill-opacity=%220.2%22/%3E%3Cpath d=%22M65 220h270%22 stroke=%22%23141414%22 stroke-opacity=%220.2%22 stroke-width=%2210%22 stroke-linecap=%22round%22/%3E%3Ctext x=%2250%25%22 y=%2254%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%23141414%22 fill-opacity=%220.6%22 font-family=%22Arial%2C sans-serif%22 font-size=%2220%22%3EProduct Image%3C/text%3E%3C/svg%3E';

export const handleProductImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    if (img.src !== PRODUCT_IMAGE_FALLBACK) {
        img.src = PRODUCT_IMAGE_FALLBACK;
    }
    img.onerror = null;
};
